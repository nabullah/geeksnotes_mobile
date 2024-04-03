import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SignalService } from "./core/services/signal.service";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent {
	constructor(private readonly router: Router, private readonly signalService: SignalService) {
		// this.router.events.subscribe((event: any) => {
		// 	if (event instanceof NavigationEnd) {
		// 		this.signalService.setCurrentRoute(event.url);
		// 	}
		// });
	}
}
