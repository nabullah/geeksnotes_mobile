import { Component, OnInit } from "@angular/core";
import { SearchPage } from "../../search/search.page";
import { Router } from "@angular/router";
import { RoutesPath } from "src/app/core/routes/routes";
import { APIResponse, Notes } from "src/app/core/interface";
import { ApiService } from "src/app/core/services/api.service";
import { EncryptDecryptService } from "src/app/core/services/encrypt-decrypt.service";
import { RefresherCustomEvent } from "@ionic/angular";

@Component({
	selector: "app-notes",
	templateUrl: "./notes.page.html",
	styleUrls: ["./notes.page.scss"],
})
export class NotesPage implements OnInit {
	public readonly SearchComponent = SearchPage;

	public isLoaderActive: boolean;
	constructor(
		private readonly router: Router,
		private readonly apiService: ApiService,
		private readonly encryptDecryptService: EncryptDecryptService
	) {
		this.isLoaderActive = false;
	}

	allNotesList!: Notes[];
	ngOnInit(): void {
		this.getAllNotes();
	}

	public routeToSearch() {
		this.router.navigate([RoutesPath.Search]);
	}

	public getAllNotes() {
		this.isLoaderActive = true;
		this.apiService.getAllNotes().subscribe((res: APIResponse<string>) => {
			if (res.data) {
				this.allNotesList = this.encryptDecryptService.descrpUsingAES(res.data);
				console.log(this.allNotesList);
				this.isLoaderActive = false;
			} else {
				this.isLoaderActive = false;
			}
		});
	}

	public handleNoteAPIRefresh(event: RefresherCustomEvent) {
		this.getAllNotes();
		setTimeout(() => {
			event.target.complete();
		}, 1000);
	}
}
