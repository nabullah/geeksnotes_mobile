import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesPath } from "../../routes/routes";
import { NoteDetailsPage } from "src/app/pages/note-details/note-details.page";
import { Notes } from "../../models";

@Component({
	selector: "app-notes-listing",
	templateUrl: "./notes-listing.component.html",
	styleUrls: ["./notes-listing.component.scss"],
})
export class NotesListingComponent {
	@Input() notes: Notes[];
	@Input() noDataTitle: string;
	public NoteDetailsComponent = NoteDetailsPage;

	constructor(private readonly router: Router) {
		this.notes = [];
		this.noDataTitle = "";
	}

	openDetailsPage(noteId: number) {
		this.router.navigate([RoutesPath.NotesDetails, noteId]);
	}
}
