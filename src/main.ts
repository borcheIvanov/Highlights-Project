import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { AppComponent } from './app/containers';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import * as containers from './app/containers';
import * as components from './app/components';
import { provideAppInitializer } from './app-initializer';

const routes = [
  {
    path: '',
    component: containers.HomeComponent
  },
  {
    path: 'privacy-policy',
    component: components.PrivacyComponent,
    pathMatch: 'full',
  },
  {
    path: 'terms-of-service',
    component: components.TermsOfServiceComponent,
    pathMatch: 'full',
  },
] as Routes;

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    [provideAppInitializer()]
  ]
});


