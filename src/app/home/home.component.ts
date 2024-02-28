import {Component} from '@angular/core';
import {blogRoutes} from "../app.generated.blog.routes";
import {BlogEntry} from "../blog/blog.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  blogEntries: Array<BlogEntry> = blogRoutes.map(it => it.data as BlogEntry).slice(0, 2);
}
