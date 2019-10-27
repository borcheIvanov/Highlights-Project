import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { VideosService } from "./services/videos.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import { AppComponent } from "./containers";

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [BrowserModule, HttpClientModule, NgbModule],
  providers: [VideosService],
  bootstrap: [AppComponent]
})
export class AppModule {}
