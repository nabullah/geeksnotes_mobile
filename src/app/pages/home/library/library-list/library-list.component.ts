import { Component, OnDestroy, OnInit } from "@angular/core";
import { takeWhile } from "rxjs";
import { NO_DATA } from "src/app/core/enum/app.enum";
import { APIResponse } from "src/app/core/interface";
import { Notes, Pagination } from "src/app/core/models";
import { ApiService } from "src/app/core/services/api.service";

@Component({
	selector: "app-library-list",
	templateUrl: "./library-list.component.html",
	styleUrls: ["./library-list.component.scss"],
})
export class LibraryListComponent implements OnDestroy, OnInit {
	public libraryNotesList: Notes[];
	public pagination: Pagination;
	public isComponentLoaded: boolean;
	public isLoaderActive: boolean;

	public readonly noDataEnum = NO_DATA;

	constructor(private readonly apiService: ApiService) {
		this.isComponentLoaded = true;
		this.isLoaderActive = true;

		this.pagination = new Pagination();
		this.libraryNotesList = [];
	}

	ngOnInit(): void {
		this.getLibraryNotes();
	}

	ngOnDestroy(): void {
		this.isComponentLoaded = false;
	}

	ionViewDidEnter(): void {
		this.isComponentLoaded = true;
		this.getLibraryNotes();
	}

	private getLibraryNotes(): void {
		this.apiService
			.getNoteLibraryList()
			.pipe(takeWhile(() => this.isComponentLoaded))
			.subscribe({
				next: (res: APIResponse<{ [key: string]: Notes }>) => {
					this.libraryNotesList = res.data["getLikedFiles"] as Notes[];
					this.isLoaderActive = false;
				},
				error: (err) => {
					console.log(err);
					this.isLoaderActive = false;
				},
			});
	}
}
