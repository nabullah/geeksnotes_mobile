import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy, RouterModule } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage-angular";
import { authInterceptor } from "./core/interceptor/auth.interceptor";
import { tokenExpiredHandlerInterceptor } from "./core/interceptor/token-expired-handler.interceptor";
import { errorInterceptor } from "./core/interceptor/error.interceptor";
import { StorageService } from "./core/services/storage.service";
import { Drivers } from "@ionic/storage";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		BrowserAnimationsModule,
		RouterModule.forRoot([]),
		HttpClientModule,
		IonicStorageModule.forRoot({
			name: "__geeks_notes",
			driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
		}),
	],
	providers: [
		provideHttpClient(withInterceptors([authInterceptor, tokenExpiredHandlerInterceptor, errorInterceptor])),
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		StorageService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
