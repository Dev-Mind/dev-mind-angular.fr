import { Routes } from '@angular/router';
import {BlogComponent} from "./blog/blog.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {HomeComponent} from "./home/home.component";
import {ExperienceComponent} from "./experience/experience.component";
import {TrainingComponent} from "./training/training.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'experience.html',
    component: ExperienceComponent
  },
  {
    path: 'formation.html',
    component: TrainingComponent
  },
  {
    path: 'blog.html',
    component: BlogComponent
  }
];
