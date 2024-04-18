import { Component, OnDestroy, OnInit } from "@angular/core";
import { SearchPage } from "../../search/search.page";
import { Router } from "@angular/router";
import { RoutesPath } from "src/app/core/routes/routes";
import { APIResponse } from "src/app/core/interface";
import { ApiService } from "src/app/core/services/api.service";
import { EncryptDecryptService } from "src/app/core/services/encrypt-decrypt.service";
import { RefresherCustomEvent } from "@ionic/angular";
import { Notes } from "src/app/core/models";
import { takeWhile } from "rxjs";

@Component({
	selector: "app-notes",
	templateUrl: "./notes.page.html",
	styleUrls: ["./notes.page.scss"],
})
export class NotesPage implements OnInit, OnDestroy {
	public readonly SearchComponent = SearchPage;
	public allNotesList: Notes[];

	public isLoaderActive: boolean;
	public isComponentLoaded: boolean;
	constructor(
		private readonly router: Router,
		private readonly apiService: ApiService,
		private readonly encryptDecryptService: EncryptDecryptService
	) {
		this.isLoaderActive = false;
		this.isComponentLoaded = true;

		this.allNotesList = [];
	}

	ngOnInit(): void {
		this.getAllNotes();
	}

	ngOnDestroy(): void {
		this.isComponentLoaded = false;
	}

	public routeToSearch(): void {
		this.router.navigate([RoutesPath.Search]);
	}

	public getAllNotes(): void {
		this.isLoaderActive = true;
		this.apiService
			.getAllNotes()
			.pipe(takeWhile(() => this.isComponentLoaded))
			.subscribe({
				next: (res: APIResponse<string>) => {
					if (res.data) {
						this.allNotesList = this.encryptDecryptService.descrpUsingAES(res.data);
						console.log(this.allNotesList);
						this.isLoaderActive = false;
					} else {
						this.isLoaderActive = false;
					}
				},
				error: () => {
					this.isLoaderActive = false;
				},
			});
	}

	public handleNoteAPIRefresh(event: RefresherCustomEvent): void {
		this.getAllNotes();
		setTimeout(() => {
			event.target.complete();
		}, 1000);
	}
}
