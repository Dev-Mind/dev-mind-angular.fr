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

const processor = Asciidoctor();

// Path where ascii doc files are located
const PATH = 'src';
// Path where generated files will be located
const OUTPUT = 'src/generated';


async function convertAsciiDocFiles(section) {
  try {
    const files = await readdir(`./${PATH}/${section}`, {recursive: true, withFileTypes: true});
    return files
      .filter(file => !file.isDirectory())
      .map(file => {
        const asciidocFile = processor.loadFile(`${file.path}/${file.name}`);
        processor.convertFile(`${file.path}/${file.name}`, {
          mkdirs: true,
          standalone: false,
          catalog_assets: true,
          to_dir: file.path.replace(PATH, OUTPUT),
          to_file: true
        });
        const attibutes = asciidocFile.attributes['$$smap'];
        return {
          image: attibutes['imgteaser'],
          author: attibutes['authors'],
          publicationDate: attibutes['docdate'],
          title: attibutes['doctitle'],
          description: attibutes['description'],
          keywords: attibutes['keywords'] ? attibutes['keywords'].split(',') : [],
          teaser: attibutes['teaser'],
          category: attibutes['category'],
          priority: attibutes['priority'] || '0.6',
          filename: file.name.replace('.adoc', '.html'),
          folder: file.path.replace(`${PATH}/${section}`, '')
        };
      });
  } catch (err) {
    console.error(err);
    return [];
  }
}

function writeFile(path, content) {
  fs.writeFile(path, content, err => {
    if (err) {
      console.error(err);
    } else {
      console.info('File written', path);
    }
  });
}

function generateRoutingFile(metadata, section) {
  const routes = metadata
    .filter(it => it.title)
    .map(it =>({
      path: it.filename,
      component: 'blog',
      data: {
        title: it.title,
        author: it.author,
        publicationDate: it.publicationDate,
        category: it.category,
        description: it.description,
        keywords: it.keywords,
        priority: it.priority,
        filename: it.filename,
        folder: it.folder,
      },
    })
  );
  console.log(`Generated routing ${routes.length} files for ${section}`);
  writeFile(
    `./src/app/app.generated.${section}.routes.ts`,
    `
import { BlogComponent } from './blog/blog.component';
import { Routes } from '@angular/router';

export const generatedRoutes: Routes = ${
  JSON
    .stringify(routes)
    .replaceAll(/[']/g, "&apos;")
    .replaceAll('"blog"', 'BlogComponent')
    .replaceAll(/["]/g, "\'")
    .replaceAll("'path'", "path")
    .replaceAll("'component'", "component")
    .replaceAll("'data'", "data")
};
`);
}

convertAsciiDocFiles('training').then(metadata => {
  generateRoutingFile(metadata, 'training');
});

convertAsciiDocFiles('blog').then(metadata => {
  generateRoutingFile(metadata, 'blog');
});

