import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { VideosService } from "./services/videos.service";

import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import { AppComponent, HomeComponent } from './containers';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyComponent, TermsOfServiceComponent } from './components';

const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyComponent,
    pathMatch: 'full',
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent,
    pathMatch: 'full',
  },
] as Routes;

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [VideosService],
  bootstrap: [AppComponent]
})
export class AppModule {}
