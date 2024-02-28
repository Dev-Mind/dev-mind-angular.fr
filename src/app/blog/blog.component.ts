import {Component, Input, OnInit} from '@angular/core';
import {blogRoutes} from "../app.generated.blog.routes";
import {JsonPipe, NgForOf, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {RouterModule} from "@angular/router";

export interface BlogEntry {
  title: string;
  publicationDate: string,
  description: string,
  filename: string,
  folder: string,
  image: string,
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    RouterModule,
    NgOptimizedImage,
    SlicePipe,
    NgIf,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  @Input()
  archive = false;
  blogEntries: Array<BlogEntry> = blogRoutes.map(it => it.data as BlogEntry);
  displayedArticles = 4;

  ngOnInit(): void {
    this.displayedArticles = this.archive ? 4000 : 4;
  }

}
