import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesPath } from "src/app/core/routes/routes";
import { SearchPage } from "../../search/search.page";

@Component({
	selector: "app-profession",
	templateUrl: "./profession.page.html",
	styleUrls: ["./profession.page.scss"],
})
export class ProfessionPage {
	public readonly SearchComponent = SearchPage;
	constructor(private readonly router: Router) {}

	public routeToSearch() {
		this.router.navigate([RoutesPath.Search]);
	}
}
