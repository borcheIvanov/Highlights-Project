import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { VideosService } from "./services/videos.service";

import * as containers from "./containers";
import * as components from "./components";
import {RouterModule, Routes } from '@angular/router';

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

@NgModule({
  declarations: [
    containers.AppComponent,
    containers.HomeComponent,
    components.PlayerComponent,
    components.PlaylistComponent,
    components.PrivacyComponent,
    components.TermsOfServiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [VideosService],
  bootstrap: [containers.AppComponent]
})
export class AppModule {}
