import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./app.component"
import { TigerHeadComponent } from "./tiger-head/tiger-head.component"
import { ThreeService } from "../three.service"

@NgModule({
  declarations: [AppComponent, TigerHeadComponent],
  imports: [BrowserModule],
  providers: [ThreeService],
  bootstrap: [AppComponent],
})
export class AppModule {}

