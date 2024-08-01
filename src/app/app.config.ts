import {ApplicationConfig} from '@angular/core';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient} from "@angular/common/http";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({scrollPositionRestoration: "top", anchorScrolling: "enabled"})
    ),
    provideHttpClient(),
    provideClientHydration()
  ]
};
