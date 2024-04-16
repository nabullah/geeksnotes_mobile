import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { takeWhile } from "rxjs";
import { NO_DATA } from "src/app/core/enum/app.enum";
import { APIResponse } from "src/app/core/interface";
import { Pagination, Reviews } from "src/app/core/models";
import { RoutesPath } from "src/app/core/routes/routes";
import { ApiService } from "src/app/core/services/api.service";

@Component({
	selector: "app-reviews",
	templateUrl: "./reviews.page.html",
	styleUrls: ["./reviews.page.scss"],
})
export class ReviewsPage implements OnDestroy {
	public isComponentLoaded: boolean;
	public isLoaderActive: boolean;

	public readonly noDataEnum = NO_DATA;
	public reviewsList: Reviews[];
	private pagination: Pagination;
	public routePath = RoutesPath;
	public fileId: number;

	constructor(private readonly apiService: ApiService, private readonly activatedRoute: ActivatedRoute) {
		this.reviewsList = [];
		this.isComponentLoaded = true;
		this.isLoaderActive = true;
		this.pagination = new Pagination();

		this.fileId = +this.activatedRoute.snapshot.paramMap.get("id")!;
	}

	ngOnDestroy(): void {
		this.isComponentLoaded = false;
	}

	ionViewDidEnter(): void {
		this.isComponentLoaded = true;
		this.getAllReviewsForFile();
	}

	private getAllReviewsForFile(): void {
		this.apiService
			.listFileReviewsWithId(this.fileId)
			.pipe(takeWhile(() => this.isComponentLoaded))
			.subscribe({
				next: (res: APIResponse<Reviews>) => {
					this.reviewsList = res.data as Reviews[];
					this.isLoaderActive = false;
				},
				error: (err) => {
					this.isLoaderActive = false;
				},
			});
	}
}
