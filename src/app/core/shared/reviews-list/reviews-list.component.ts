import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Reviews } from "../../models";
import { IonModal } from "@ionic/angular";
import { Router } from "@angular/router";
import { RoutesPath } from "../../routes/routes";
import { SignalService } from "../../services/signal.service";
import { ApiService } from "../../services/api.service";
import { APIResponse } from "../../interface";

@Component({
	selector: "app-reviews-list",
	templateUrl: "./reviews-list.component.html",
	styleUrls: ["./reviews-list.component.scss"],
})
export class ReviewsListComponent {
	@Input() reviewsList: Reviews[];
	@Input() noDataTitle: string;

	@Output() isReviewDeleted: EventEmitter<boolean>;

	@ViewChild("reviewActionModal", { static: false }) reviewActionModal!: IonModal;

	public isReviewDeleting: boolean;

	private editReviewItem: Reviews;

	constructor(private readonly router: Router, public readonly signalService: SignalService, public readonly apiService: ApiService) {
		this.reviewsList = [];
		this.noDataTitle = "";
		this.editReviewItem = {};
		this.isReviewDeleting = false;

		this.isReviewDeleted = new EventEmitter<boolean>();
	}

	public openReviewActionModal(item: Reviews): void {
		this.reviewActionModal.present();
		this.editReviewItem = item;
	}

	public editFileReview(): void {
		this.signalService.storeUpdateReviewData.set(this.editReviewItem);
		this.reviewActionModal.dismiss();
		this.router.navigate([RoutesPath.NotesDetails + "/" + this.editReviewItem.fileId + RoutesPath.NotesDetailsReviewsCreate]);
	}

	public deleteFileReview(): void {
		this.isReviewDeleting = true;
		this.apiService.deleteFileReviewsWithId(this.editReviewItem.id!).subscribe((res: APIResponse<[]>) => {
			if (res.status) {
				this.isReviewDeleted.emit(true);
				this.isReviewDeleting = false;
				this.reviewActionModal.dismiss();
			}
		});
	}
}
