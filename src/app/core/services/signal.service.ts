import { Injectable, inject, signal } from "@angular/core";
import { Notes, Reviews } from "../models";
import { StorageService } from "./storage.service";
import { APPCONSTANTS } from "../constants/app.constants";
import { User } from "../models/user.model";

@Injectable({
	providedIn: "root",
})
export class SignalService {
	private storageService = inject(StorageService);

	public currentRoute = signal<string>("");
	public currentViewNoteData = signal<Notes>(new Notes());
	public getToken = signal<string>("");
	public getUserObject = signal<User>(new User());
	public storeUpdateReviewData = signal<Reviews>({});

	constructor() {
		this.initializeAuthentications();
	}

	public setCurrentRoute(route: string) {
		this.currentRoute.set(route);
	}

	public getCurrentRoute() {
		return this.currentRoute();
	}

	private async setUserObject() {
		const user = JSON.parse(localStorage.getItem(APPCONSTANTS.USER) || "{}");
		this.getUserObject.set(user);
	}

	public initializeAuthentications(): void {
		this.setUserObject();
		this.getToken.set(this.storageService.getAuthorizationToken());
	}
}
