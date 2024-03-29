import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy, RouterModule } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, RouterModule.forRoot([])],
	providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
	bootstrap: [AppComponent],
})
export class AppModule {}
