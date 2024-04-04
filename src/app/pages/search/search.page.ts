import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInput, IonSearchbar, SearchbarCustomEvent } from "@ionic/angular";

@Component({
	selector: "app-search",
	templateUrl: "./search.page.html",
	styleUrls: ["./search.page.scss"],
})
export class SearchPage {
	@ViewChild("searchBar", { static: false, read: IonSearchbar }) searchBar!: IonSearchbar;

	popularSearches: string[];
	searchQuery: string;
	constructor() {
		this.popularSearches = ["<NAME 1>", "<NAME 2>", "<NAME 3>", "<NAME 4>", "<NAME 5>", "<NAME 6>", "<NAME 6>", "<NAME 7>"];
		this.searchQuery = "";
	}

	ionViewDidEnter() {
		this.searchBar?.setFocus();
	}

	handleSearchInput(event: SearchbarCustomEvent) {
		this.searchQuery = event.detail.value || "";
	}
}
