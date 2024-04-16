import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { takeWhile } from "rxjs";
import { APIResponse } from "src/app/core/interface";
import { Reviews } from "src/app/core/models";
import { RoutesPath } from "src/app/core/routes/routes";
import { ApiService } from "src/app/core/services/api.service";
import { SignalService } from "src/app/core/services/signal.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
	selector: "app-add-review",
	templateUrl: "./add-review.component.html",
	styleUrls: ["./add-review.component.scss"],
})
export class AddReviewComponent implements OnDestroy, OnInit {
	public isComponentLoaded: boolean;
	public isLoaderActive: boolean;

	public postReviewForm!: FormGroup;
	private fileId: number;
	private updateReviewData: Reviews;
	public isUpdateReviewActive: boolean;

	constructor(
		private readonly apiService: ApiService,
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		private readonly toast: ToastService,
		private readonly signalService: SignalService
	) {
		this.isComponentLoaded = true;
		this.isLoaderActive = false;
		this.fileId = +this.activatedRoute.snapshot.paramMap.get("id")!;

		this.updateReviewData = {};
		this.isUpdateReviewActive = false;
	}
	ngOnInit(): void {
		this.initializeReviewForm();
		this.isReviewForUpdate();
	}

	ngOnDestroy(): void {
		this.isComponentLoaded = false;
		this.signalService.storeUpdateReviewData.set(new Reviews());
		this.isUpdateReviewActive = false;
	}

	private initializeReviewForm(): void {
		this.postReviewForm = this.fb.group({
			reviewText: [""],
			rating: [""],
		});
	}

	public createReview(): void {
		this.isLoaderActive = true;
		const payload = {
			...this.postReviewForm.value,
			fileId: this.fileId,
		};
		this.apiService
			.createFileReview(payload)
			.pipe(takeWhile(() => this.isComponentLoaded))
			.subscribe({
				next: (res: APIResponse<Reviews>) => {
					if (res.status) {
						this.toast.presentToastSuccess("bottom", "Review posted successfully");
						this.router.navigate([RoutesPath.NotesDetails + "/" + this.fileId + RoutesPath.NotesDetailsReviews]);
					}
				},
				error: (err: any) => {
					this.isLoaderActive = false;
				},
				complete: () => {
					this.isLoaderActive = false;
				},
			});
	}

	private isReviewForUpdate(): void {
		this.updateReviewData = this.signalService.storeUpdateReviewData();
		if (this.updateReviewData) {
			this.postReviewForm.patchValue({
				reviewText: this.updateReviewData.reviewText,
				rating: this.updateReviewData.ratings?.rating,
			});
			this.isUpdateReviewActive = true;
		}
	}

	public updateReview(): void {
		this.isLoaderActive = true;
		const payload = {
			...this.postReviewForm.value,
			fileId: this.fileId,
			reviewId: this.updateReviewData.id,
		};
		this.apiService
			.updateFileReview(payload)
			.pipe(takeWhile(() => this.isComponentLoaded))
			.subscribe({
				next: (res: APIResponse<Reviews>) => {
					if (res.status) {
						this.toast.presentToastSuccess("bottom", "Review posted successfully");
						this.router.navigate([RoutesPath.NotesDetails + "/" + this.fileId + RoutesPath.NotesDetailsReviews]);
					}
				},
				error: (err: any) => {
					this.isLoaderActive = false;
				},
				complete: () => {
					this.isLoaderActive = false;
				},
			});
	}
}
