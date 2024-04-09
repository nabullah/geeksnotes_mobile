import { Injectable, signal } from "@angular/core";
import { Notes } from "../models";

@Injectable({
	providedIn: "root",
})
export class SignalService {
	public currentRoute = signal<string>("");
	public currentViewNoteData = signal<Notes>(new Notes());
	constructor() {}

	setCurrentRoute(route: string) {
		this.currentRoute.set(route);
	}

	getCurrentRoute() {
		return this.currentRoute();
	}
}
