import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Reviews } from "../../models";
import { IonModal } from "@ionic/angular";
import { Router } from "@angular/router";
import { RoutesPath } from "../../routes/routes";
import { SignalService } from "../../services/signal.service";

@Component({
	selector: "app-reviews-list",
	templateUrl: "./reviews-list.component.html",
	styleUrls: ["./reviews-list.component.scss"],
})
export class ReviewsListComponent {
	@Input() reviewsList: Reviews[];
	@Input() noDataTitle: string;

	@ViewChild("reviewActionModal", { static: false }) reviewActionModal!: IonModal;

	private editReviewItem: Reviews;

	constructor(private readonly router: Router, private readonly signalService: SignalService) {
		this.reviewsList = [];
		this.noDataTitle = "";
		this.editReviewItem = {};
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
}
