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
		this.getTokenFromStorage();
		setTimeout(() => {
			if (this.getToken() !== "") {
				this.setUserObject();
			}
		}, 500);
	}

	public setCurrentRoute(route: string) {
		this.currentRoute.set(route);
	}

	public getCurrentRoute() {
		return this.currentRoute();
	}

	private async getTokenFromStorage() {
		const token = await this.storageService.get(APPCONSTANTS.TOKEN);
		this.getToken.set(token);
	}

	private async setUserObject() {
		const user = await this.storageService.get(APPCONSTANTS.USER);
		this.getUserObject.set(user);
	}
}
