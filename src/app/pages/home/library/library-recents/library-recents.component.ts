import { Component, OnInit } from "@angular/core";
import { NO_DATA } from "src/app/core/enum/app.enum";

@Component({
	selector: "app-library-recents",
	templateUrl: "./library-recents.component.html",
	styleUrls: ["./library-recents.component.scss"],
})
export class LibraryRecentsComponent {
	public notes = [];

	public readonly noDataEnum = NO_DATA;
	constructor() {}
}
