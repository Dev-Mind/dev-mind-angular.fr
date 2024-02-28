import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {blogGeneratedTemplates} from "../generated/generated.blog.templates";
import {trainingGeneratedTemplates} from "../generated/generated.training.templates";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-asciidoc-viewer',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './ascii-doc-viewer.component.html',
  styleUrl: './ascii-doc-viewer.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AsciiDocViewerComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  author: string = 'devmind';
  @Input()
  publicationDate: string = '';
  @Input()
  category: string = '';
  @Input()
  keywords: string[] = [];
  @Input()
  description: string = '';
  @Input()
  filename: string = '';
  @Input()
  folder: string = '';
  @Input()
  image: string = '';
  @Input()
  type: string = 'blog';

  content: SafeHtml | null = null;

  constructor(private domSanitizer:DomSanitizer) {
  }

  ngOnInit(): void {
    const content = blogGeneratedTemplates.get(this.filename) || trainingGeneratedTemplates.get(this.filename) || '';

    const contentWithoutSpecialChars = content
      .replaceAll('&amp;quot;', '&quot;')
      .replaceAll('&amp;apos;', '&apos;')
      .replaceAll('@link@', this.filename + '.html')
      .replaceAll('@dollar@', '$')
      .replaceAll('@backtick@', '`')
      .replaceAll('&amp;#xEA;', '&ecirc;')
      .replaceAll('<span class="icon">[flask&#93;</span>', '<img src="/img/ic_flask.svg" style="width: 1em"/>')
      .replaceAll('<span class="hljs-meta">@backtick</span>@', '`')
      .replaceAll('<span class="hljs-meta">@backtick</span><span class="hljs-meta">@', '`')
      .replaceAll('<span class="hljs-meta">@dollar</span>@', '$')
      .replaceAll('<span class="hljs-symbol">&amp;lt;</span>', '&lt;')
      .replaceAll('<span class="hljs-symbol">&amp;gt;</span>', '&gt;');

    this.content = this.domSanitizer.bypassSecurityTrustHtml(contentWithoutSpecialChars);
  }

}
