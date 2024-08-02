/**
 * This script is launched by the watcher or the build process to convert asciidoc files to html. During
 * this convertion we also generate different files from metadata
 * - the site map file
 * - the rss feed
 * - the angular routing file for blog
 */
const Asciidoctor = require('asciidoctor')
const {readdir} = require("node:fs/promises");
const fs = require('node:fs');
const cheerio = require('cheerio');

const hljs = require('highlight.js');

// Load any languages you need
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
hljs.registerLanguage('kotlin', require('highlight.js/lib/languages/kotlin'));
hljs.registerLanguage('properties', require('highlight.js/lib/languages/properties'));
hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));
hljs.registerLanguage('handlebars', require('highlight.js/lib/languages/handlebars'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('wasm', require('highlight.js/lib/languages/wasm'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));

const processor = Asciidoctor();

// Path where ascii doc files are located
const PATH = 'asciidoc';
// Path where generated files will be located
const OUTPUT = 'src/app/generated';

function normalizeFilename(name) {
  return `_${name.replaceAll('.adoc', '').replace(/ /g, '_').replaceAll('-', '_').replace(/[^a-zA-Z0-9-]/g, '_').toLowerCase()}`;
}

/**
 * This function will convert all asciidoc files to html and generate metadata for each file
 * @param section
 * @returns {Promise<({image: *, filename: *, folder: string, keywords: *|[], author: *, description: *, title: *, category: *, priority, publicationDate: *, teaser: *}|Awaited<*|[]|undefined>)[]|*[]>}
 */
async function convertAsciiDocFiles(section) {
  try {
    const files = await readdir(`./${PATH}/${section}/`, {recursive: true, withFileTypes: true});

    // As we can write ascii doc files in sub directories we need to convert them as well with a recursive call
    const directoryFile = files
      .filter(file => file.isDirectory() && file.name !== '.' && file.name !== '..')
      .map(async file => await convertAsciiDocFiles(`${section}/${file.name}`))

    const asciidocFiles = files
      .filter(file => !file.isDirectory())
      .map(file => {
        const filePath = `./${PATH}/${section}/${file.name}`;
        if (!fs.existsSync(filePath)) {
          return null;
        }
        const asciidocFile = processor.loadFile(filePath);
        // The content is not directly written to a file but stored in a variable
        const content = asciidocFile.convert({
          mkdirs: true,
          standalone: false,
          catalog_assets: true,
          to_dir: `./${OUTPUT}/${section}`,
          to_file: true,
        })
          .replaceAll(`$`, '@dollar@')
          .replaceAll('`', '@backtick@')
          .replaceAll('&quot;', '@quot@')
          .replaceAll('&apos;', '@apos@')
          .replaceAll('-&gt;', '@LAMBDA')
          .replaceAll('=&gt;', '@ARROW')
          .replaceAll('&gt;', '@GT')
          .replaceAll('&lt;', '@LT')
          .replaceAll('href="#', 'class="link" fragment="#');


        // We use cheerio to parse the html and highlight the code
        const html = cheerio.load(content, {
          decodeEntities: false,
          lowerCaseTags: false,
          withEndIndices: false,
          normalizeWhitespace: false,
          recognizeSelfClosing: true
        });

        html('pre.highlight code').each((index, code) => {
          const elem = html(code);
          const language = elem.prop('data-lang');

          const fileContents = elem.html();

          const highlightedContents = hljs.highlight(fileContents, {language: language || 'javascript'}).value;
          if (language) {
            const id = new Date().getTime() + Math.random() * 1000 / 1000;
            elem.replaceWith(`<code class="language-${language}" id="${id}">${highlightedContents}</code><button class="btn-copy-code" onclick="copyToClipboard('${id}')">Copy</button>`);
          } else {
            elem.replaceWith(`${highlightedContents}`);
          }
          elem.addClass('highlights');
        });

        // We create a TS file for each asciidoc file to be able to import the content in the angular component
        const filename = normalizeFilename(file.name);
        writeFile(`./${OUTPUT}/${section}/${filename}.ts`, `export const ${filename}:string = \`${html.html()}\`;`);

        const attributes = asciidocFile.attributes['$$smap'];
        return {
          image: attributes['imgteaser'],
          author: attributes['authors'],
          publicationDate: attributes['revdate'],
          title: attributes['doctitle'],
          description: attributes['description'],
          keywords: attributes['keywords'] ? attributes['keywords'].split(',').map(it => it.trim()).flatMap(it => it.split(' ')) : [],
          teaser: attributes['teaser'],
          category: attributes['category'],
          priority: attributes['priority'] || '0.6',
          filename,
          folder: `${section}`
        };
      })
      .filter(it => it);

    return [
      ...asciidocFiles,
      ...await Promise
        .all(directoryFile)
        .then((arrayOfArrays) => [].concat.apply([], arrayOfArrays))
    ]
  } catch (err) {
    console.error(err);
    return [];
  }
}

/**
 * Write a file to the file system and create the directory if it does not exist
 * @param path
 * @param content
 */
function writeFile(path, content) {
  fs.mkdirSync(path.substring(0, path.lastIndexOf('/')), {recursive: true});
  fs.writeFile(path, content, err => {
    if (err) {
      console.error(err);
    }
  });
}

/**
 * Angular use routing file to define the routes of the application. This function generate the routing file
 * for the blog section based on the metadata
 * @param metadata
 * @param section
 */
function generateRoutingFile(metadata, section) {
  const routes = metadata
    .filter(it => it.title)
    .map(it => ({
        path: it.folder + '/' + it.filename.replace('_', '') + '.html',
        component: 'blog',
        data: {
          title: it.title,
          author: it.author,
          publicationDate: new Date(it.publicationDate).toLocaleDateString('fr-FR'),
          category: it.category,
          description: it.description,
          keywords: it.keywords,
          priority: it.priority,
          filename: it.filename.replace('_', ''),
          folder: it.folder,
          image: it.image,
        },
      })
    );
  writeFile(
    `./src/app/app.generated.${section}.routes.ts`,
    `
import { AsciiDocViewerComponent } from './asciidoc-viewer/ascii-doc-viewer.component';
import { Routes } from '@angular/router';

export const ${section}Routes: Routes = ${
      JSON
        .stringify(routes)
        .replaceAll(/[']/g, "\\'")
        .replaceAll('"blog"', 'AsciiDocViewerComponent')
        .replaceAll(/["]/g, "\'")
        .replaceAll("'path'", "path")
        .replaceAll("'component'", "component")
        .replaceAll("'data'", "data")
    };
`);
}

function generateTemplateLoaderFile(metadata, section) {
  const imports = metadata
    .filter(it => it.filename)
    .map(it => (`import { ${it.filename} } from './${it.folder}/${it.filename}';`))
    .join('\n');

  const exports = metadata.filter(it => it.title)
    .map(it => (`${section}GeneratedTemplates.set('${it.filename.replace('_', '')}', ${it.filename});`))
    .join('\n');

  const fileContent = `
${imports}
export const ${section}GeneratedTemplates = new Map<string, string>();
${exports}
  `;

  writeFile(
    `./${OUTPUT}/generated.${section}.templates.ts`,
    fileContent
  );
}

function generateRssFeed(metadata, section) {
  const items = metadata
    .filter(it => it.title)
    .map(it => `
    <item>
      <title>${it.title}</title>
      <link>https://dev-mind.fr/${section}/${it.filename.replace('_', '') + '.html'}</link>
      <description>${it.description}</description>
      <pubDate>${new Date(it.publicationDate).toUTCString()}</pubDate>
      <author>${it.author}</author>
      <category>${it.category}</category>
    </item>
    `)
    .join('\n');

  const fileContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Le blog de Dev-Mind - articles sur le développement (Java, Web, ...)</title>
    <link>https://dev-mind.fr/blog.html</link>
    <description>Le blog Dev-Mind regroupe des articles des interviews sur des sujets divers allant de la programmation Java JavaScript aux méthodes agiles Environnement, Blogs ...</description>
    <copyright>Dev-Mind</copyright>
    <language>fr</language>
    <image>
      <url>https://dev-mind.fr/img/logo/logo_200-55ef190e81.png</url>
      <title>Le blog de Dev-Mind</title>
      <link>https://dev-mind.fr/blog</link>
    </image>
    ${items}
  </channel>
</rss>
  `;
  //writeFile(`./${OUTPUT}/${section}/${section}.rss.xml`,`export const ${section}Rss:string = \`${fileContent}\`;`)
  writeFile(`./${OUTPUT}/rss/${section}.xml`, fileContent);
}

function generateSiteMap(metadata, section) {
  const items = metadata
    .filter(it => it.title)
    .map(it => `
    <url>
        <loc>https://dev-mind.fr/${section}/${it.filename.replace('_', '') + '.html'}</loc>
        <lastmod>>${new Date(it.publicationDate).toUTCString()}</lastmod>
        <priority>0.6</priority>
    </url>
    `)
    .join('\n');

  const fileContent = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
      <loc>https://dev-mind.fr/</loc>
      <lastmod>${new Date().toUTCString()}</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://dev-mind.fr/blog.html</loc>
      <lastmod>${new Date().toUTCString()}</lastmod>
      <priority>0.90</priority>
    </url>
    <url>
      <loc>https://dev-mind.fr/blog_archive.html</loc>
      <lastmod>${new Date().toUTCString()}</lastmod>
      <priority>0.90</priority>
    </url>
    <url>
      <loc>https://dev-mind.fr/formations.html</loc>
      <lastmod>${new Date().toUTCString()}</lastmod>
      <priority>0.90</priority>
    </url>
    <url>
      <loc>https://dev-mind.fr/training/trainings.html</loc>
      <lastmod>${new Date().toUTCString()}</lastmod>
      <priority>0.90</priority>
    </url>
    <url>
      <loc>https://dev-mind.fr/experience.html</loc>
      <lastmod>${new Date().toUTCString()}</lastmod>
      <priority>0.70</priority>
    </url>
    ${items}
</urlset>
  `;
  writeFile(`./src/sitemap.xml`, fileContent);
}

/**
 * Comparator to sort blog entries by publication date
 * @param a
 * @param b
 * @returns {number}
 */
const comparator = (a, b) => (a.publicationDate < b.publicationDate ? 1 : (a.publicationDate > b.publicationDate ? -1 : 0));


convertAsciiDocFiles('blog').then(metadata => {
  generateRoutingFile(metadata.sort(comparator), 'blog');
  generateTemplateLoaderFile(metadata, 'blog');
  generateRssFeed(metadata.sort(comparator), 'blog');
  generateSiteMap(metadata.sort(comparator), 'blog');
});

convertAsciiDocFiles('training').then(metadata => {
  generateRoutingFile(metadata.sort(comparator), 'training');
  generateTemplateLoaderFile(metadata, 'training');
});

/**
 * Generate a file with the generation instant to be able to display it in the footer of the application
 */
writeFile(`./src/app/app.generation.instant.ts`,
  `export const generationInstant = '${new Date().toLocaleDateString('fr-FR')}';`
);
