import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {RouterModule} from "@angular/router";
import {BlogEntry} from "../../blog/blog.component";
import {trainingRoutes} from "../../app.generated.training.routes";

@Component({
  selector: 'app-all-training',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    SlicePipe,
    RouterModule
  ],
  templateUrl: './all-training.component.html',
})
export class AllTrainingComponent {
  blogEntries: Array<BlogEntry> = trainingRoutes.map(it => it.data as BlogEntry);

  postPath(post: BlogEntry) {
    return ['/', ...post.folder.split('/'), post.filename + '.html'];
  }
}
