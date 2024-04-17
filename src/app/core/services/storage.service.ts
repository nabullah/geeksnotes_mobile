import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { APPCONSTANTS } from "../constants/app.constants";
import { User } from "../models";

@Injectable({
	providedIn: "root",
})
export class StorageService {
	private _storage: Storage | null = null;

	constructor(private storage: Storage) {
		this.init();
	}

	private async init() {
		const storage = await this.storage.create();
		this._storage = storage;
	}

	/**To set an item, use set(key, value) */
	public async set(key: string, value: any) {
		await this._storage?.set(key, value);
	}

	/**To get the item back, use get(name) */
	public async get(key: string) {
		return await this._storage?.get(key);
	}

	/**To remove an item */
	public async remove(key: string) {
		await this._storage?.remove(key);
	}

	/**To clear all items */
	public async clearAll() {
		await this._storage?.clear();
	}

	/**To get all keys stored */
	public async getAllKeys() {
		await this._storage?.keys();
	}

	/**Related to authorization token */
	public storeAuthorizationToken(value: string) {
		localStorage.setItem(APPCONSTANTS.TOKEN, value);
	}

	public getAuthorizationToken(): string {
		return localStorage.getItem(APPCONSTANTS.TOKEN)!;
	}

	public removeAuthorizationToken(): string {
		return localStorage.removeItem(APPCONSTANTS.TOKEN)!;
	}

	public storeUserObject(value: User) {
		localStorage.setItem(APPCONSTANTS.USER, JSON.stringify(value));
	}
}
