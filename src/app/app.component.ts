import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SignalService } from "./core/services/signal.service";
import { CommonService } from "./core/services/common.service";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent {
	constructor(private readonly router: Router, private readonly commonService: CommonService) {
		// this.router.events.subscribe((event: any) => {
		// 	if (event instanceof NavigationEnd) {
		// 		this.signalService.setCurrentRoute(event.url);
		// 	}
		// });
		this.commonService.autoLogin();
	}
}
