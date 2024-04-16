import { StorageService } from "src/app/core/services/storage.service";
import { Component, OnInit } from "@angular/core";
import { APPCONSTANTS } from "src/app/core/constants/app.constants";
import { CommonService } from "src/app/core/services/common.service";
import { User } from "src/app/core/models/user.model";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.page.html",
	styleUrls: ["./profile.page.scss"],
})
export class ProfilePage {
	public user: User | null;
	constructor(private readonly storageService: StorageService, private readonly commonService: CommonService) {
		this.user = new User();
	}

	async ionViewWillEnter() {
		this.user = await this.storageService.get(APPCONSTANTS.USER);
	}

	public logout() {
		this.commonService.logOut();
	}
}
