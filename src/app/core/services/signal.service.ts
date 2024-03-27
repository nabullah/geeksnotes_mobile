import { Injectable, signal } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class SignalService {
	currentRoute = signal<string>("");
	constructor() {}

	setCurrentRoute(route: string) {
		this.currentRoute.set(route);
	}

	getCurrentRoute() {
		return this.currentRoute();
	}
}
