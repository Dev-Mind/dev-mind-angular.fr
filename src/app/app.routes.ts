import {Routes} from '@angular/router';
import {BlogComponent} from "./blog/blog.component";
import {HomeComponent} from "./home/home.component";
import {ExperienceComponent} from "./experience/experience.component";
import {TrainingComponent} from "./training/training.component";
import {blogRoutes} from "./app.generated.blog.routes";
import {trainingRoutes} from "./app.generated.training.routes";
import {AllTrainingComponent} from "./training/all-training/all-training.component";
import {SpringComponent} from "./training/spring/spring.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {inject} from "@angular/core";
import {HeaderService} from "./shared/header/header.service";
import {Title} from "@angular/platform-browser";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      current: () => inject(HeaderService).navigateTo('home'),
      title: () => inject(Title).setTitle('DevMind')
    }
  },
  {
    path: 'experience.html',
    component: ExperienceComponent,
    resolve: {
      current: () => inject(HeaderService).navigateTo('experience'),
      title: () => inject(Title).setTitle('Experience')
    }
  },
  {
    path: 'formation.html',
    component: TrainingComponent,
    resolve: {
      current: () => inject(HeaderService).navigateTo('training'),
      title: () => inject(Title).setTitle('Formation')
    }
  },
  {
    path: 'formation_spring.html',
    component: SpringComponent,
    resolve: {
      current: () => inject(HeaderService).navigateTo('training'),
      title: () => inject(Title).setTitle('Formation')
    }
  },
  {
    path: 'training/trainings.html',
    component: AllTrainingComponent,
    resolve: {
      current: () => inject(HeaderService).navigateTo('training'),
      title: () => inject(Title).setTitle('Formation')
    }
  },
  {
    path: 'blog.html',
    component: BlogComponent,
    resolve: {
      current: () => inject(HeaderService).navigateTo('blog'),
      title: () => inject(Title).setTitle('Blog')
    }
  },
  {
    path: 'blog_archive.html',
    component: BlogComponent,
    data: {
      archive: true
    },
    resolve: {
      current: () => inject(HeaderService).navigateTo('blog'),
      title: () => inject(Title).setTitle('Blog')
    }
  },
  ...blogRoutes.map(it => {
    it.data = {...it.data, type: 'blog'};
    it.resolve= {
      current: () => inject(HeaderService).navigateTo('blog'),
      title: () => inject(Title).setTitle('Blog')
    }
    return it;
  }),
  ...trainingRoutes.map(it => {
    it.data = {...it.data, type: 'training'};
    it.resolve = {
      current: () => inject(HeaderService).navigateTo('training'),
      title: () => inject(Title).setTitle('Training')
    }
    return it;
  }),
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent,
    resolve: {
      current: () => inject(HeaderService).navigateTo('home')
    }

  }
];
