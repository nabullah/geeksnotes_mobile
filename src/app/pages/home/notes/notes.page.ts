import { Component, OnInit } from "@angular/core";
import { SearchPage } from "../../search/search.page";
import { Router } from "@angular/router";
import { RoutesPath } from "src/app/core/routes/routes";

@Component({
	selector: "app-notes",
	templateUrl: "./notes.page.html",
	styleUrls: ["./notes.page.scss"],
})
export class NotesPage {
	public readonly SearchComponent = SearchPage;
	constructor(private readonly router: Router) {}

	public routeToSearch() {
		this.router.navigate([RoutesPath.Search]);
	}
}
