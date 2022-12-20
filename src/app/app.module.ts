import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { VideosService } from "./services/videos.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import { AppComponent, HomeComponent } from './containers';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyComponent } from './components';

const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyComponent,
    pathMatch: 'full',
  }
] as Routes;

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [VideosService],
  bootstrap: [AppComponent]
})
export class AppModule {}
