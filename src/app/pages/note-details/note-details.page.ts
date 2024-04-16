import { RoutesPath } from "./../../core/routes/routes";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { takeWhile } from "rxjs";
import { NO_DATA } from "src/app/core/enum/app.enum";
import { APIResponse, LikeFile } from "src/app/core/interface";
import { Notes, Reviews } from "src/app/core/models";
import { ApiService } from "src/app/core/services/api.service";
import { EncryptDecryptService } from "src/app/core/services/encrypt-decrypt.service";
import { SignalService } from "src/app/core/services/signal.service";
import { ToastService } from "src/app/core/services/toast.service";
// import { SingleNoteDetail } from "src/app/core/models/index";

@Component({
	selector: "app-note-details",
	templateUrl: "./note-details.page.html",
	styleUrls: ["./note-details.page.scss"],
})
export class NoteDetailsPage implements OnInit, OnDestroy {
	public isLoaderActive: boolean;
	public isLoaderActiveReviews: boolean;
	public selectedDocId: number;
	public noteDetail: Notes;
	public noteDetailsTags: string[];
	public isNoteFavourites: boolean;
	public isNoteAlreadyLiked: boolean;
	public isComponentLoaded: boolean;

	public readonly routesPath: typeof RoutesPath;
	public readonly noDataTextsEnum = NO_DATA;

	public reviewsList: Reviews[];

	constructor(
		private readonly router: ActivatedRoute,
		private readonly route: Router,
		private readonly apiService: ApiService,
		private readonly encryptDecryptService: EncryptDecryptService,
		private readonly signalService: SignalService,
		private readonly toast: ToastService
	) {
		this.noteDetail = new Notes();
		this.selectedDocId = +this.router.snapshot.paramMap.get("id")!;

		this.noteDetailsTags = [];
		this.isLoaderActive = false;
		this.isLoaderActiveReviews = true;
		this.isNoteFavourites = false;
		this.isNoteAlreadyLiked = false;
		this.isComponentLoaded = true;

		this.routesPath = RoutesPath;
		this.reviewsList = []
	}

	ngOnInit(): void {
		this.getSingleNote();
	}
	ngOnDestroy(): void {
		this.isComponentLoaded = false;
	}

	ionViewWillEnter(): void {
		this.checkIsNoteLiked();
		this.getAllReviewsForFile();
	}

	private getSingleNote() {
		this.isLoaderActive = true;
		this.apiService.getNoteById(this.selectedDocId).subscribe({
			next: (response: APIResponse<string>) => {
				if (response.status) {
					this.noteDetail = this.encryptDecryptService.descrpUsingAES(response.data);
					console.log("NoteDetailsPage: ", this.noteDetail);
					this.noteDetailsTags = JSON.parse(this.noteDetail.tags!);
				}
			},
			error: (err) => {
				this.isLoaderActive = false;
			},
			complete: () => {
				this.isLoaderActive = false;
			},
		});
	}

	public viewSelectedFile() {
		this.signalService.currentViewNoteData.set(this.noteDetail);
		this.route.navigate([this.routesPath.NotesDetails + "/" + this.selectedDocId + this.routesPath.NotesView], {
			queryParams: { return: this.selectedDocId },
		});
	}

	public onAddToLibrary() {
		this.isNoteFavourites = !this.isNoteFavourites;
		if (this.isNoteFavourites) {
			this.toast.presentToastSuccess("top", "Note added to library");
		} else {
			this.toast.presentToastError("top", "Note removed from library");
		}
		this.postLikeNote();
	}

	public postLikeNote() {
		this.apiService.postLikeNote({ fileId: this.selectedDocId!, userId: this.signalService.getUserObject().id! }).subscribe({
			next: (response: APIResponse<LikeFile>) => {
				if (response.status) {
					if (!response.data["liked"]) {
						this.noteDetail.likes = this.noteDetail.likes! - 1;
						this.isNoteFavourites = this.isNoteAlreadyLiked = false;
					} else {
						this.noteDetail.likes = this.noteDetail.likes! + 1;
						this.isNoteFavourites = this.isNoteAlreadyLiked = true;
					}
				}
			},
			error: (err) => {
				// this.toast.presentToastError("top", err.error.error);
			},
		});
	}

	public checkIsNoteLiked() {
		this.apiService.checkIsNoteLiked({ fileId: this.selectedDocId!, userId: this.signalService.getUserObject().id! }).subscribe({
			next: (response: APIResponse<LikeFile>) => {
				if (response.status) {
					this.isNoteAlreadyLiked = this.isNoteFavourites = response.data["liked"];
				}
			},
			error: (err) => {
				// this.toast.presentToastError("top", err.error.error);
			},
		});
	}

	public getRatingsData(): void {}
	private getAllReviewsForFile(): void {
		this.apiService
			.listFileReviewsWithId(this.selectedDocId)
			.pipe(takeWhile(() => this.isComponentLoaded))
			.subscribe({
				next: (res: APIResponse<Reviews>) => {
					this.reviewsList = res.data as Reviews[];
					this.reviewsList = this.reviewsList.slice(0, 10);;
					this.isLoaderActiveReviews = false;
				},
				error: (err) => {
					this.isLoaderActiveReviews = false;
				},
			});
	}
}
