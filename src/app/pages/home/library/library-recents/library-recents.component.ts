import { Component, OnDestroy, OnInit } from "@angular/core";
import { NO_DATA } from "src/app/core/enum/app.enum";
import { Notes } from "src/app/core/models";

@Component({
	selector: "app-library-recents",
	templateUrl: "./library-recents.component.html",
	styleUrls: ["./library-recents.component.scss"],
})
export class LibraryRecentsComponent implements OnDestroy {
	public recentNotesList: Notes[];

	public isComponentLoaded: boolean;
	public isLoaderActive: boolean;

	public readonly noDataEnum = NO_DATA;
	constructor() {
		this.recentNotesList = [];

		this.isComponentLoaded = true;
		this.isLoaderActive = true;
	}

	ngOnDestroy(): void {
		this.isComponentLoaded = false;
	}

	ionViewDidEnter(): void {
		this.isComponentLoaded = true;
	}
}
