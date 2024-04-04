import { Component, OnInit } from "@angular/core";
import { NO_DATA } from "src/app/core/enum/app.enum";

@Component({
	selector: "app-library-list",
	templateUrl: "./library-list.component.html",
	styleUrls: ["./library-list.component.scss"],
})
export class LibraryListComponent {
	public notes = [];
	public readonly noDataEnum = NO_DATA;

	constructor() {}
}
