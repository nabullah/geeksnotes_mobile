import { StorageService } from "src/app/core/services/storage.service";
import { User } from "./../../../core/interface/core-app";
import { Component, OnInit } from "@angular/core";
import { APPCONSTANTS } from "src/app/core/constants/app.constants";
import { CommonService } from "src/app/core/services/common.service";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.page.html",
	styleUrls: ["./profile.page.scss"],
})
export class ProfilePage {
	public user: User | null;
	constructor(private readonly storageService: StorageService, private readonly commonService: CommonService) {
		this.user = null;
	}

	async ionViewWillEnter() {
		this.user = await this.storageService.get(APPCONSTANTS.USER);
	}

	public logout() {
		this.commonService.logOut();
	}
}
