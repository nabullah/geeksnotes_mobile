import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InfiniteScrollCustomEvent } from "@ionic/angular";
import { takeWhile } from "rxjs";
import { NO_DATA } from "src/app/core/enum/app.enum";
import { APIResponsePaginated } from "src/app/core/interface";
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
		this.resetReviewListing();
	}

	private getAllReviewsForFile(): void {
		this.apiService
			.listFileReviewsWithId(this.fileId, this.pagination.currentPage!)
			.pipe(takeWhile(() => this.isComponentLoaded))
			.subscribe({
				next: (res: APIResponsePaginated<Reviews>) => {
					const list = res.data.data as Reviews[];
					this.reviewsList = this.reviewsList.concat(list);
					this.pagination.totalPages = res.data.pagination.totalPages;
					this.isLoaderActive = false;
				},
				error: (err) => {
					this.isLoaderActive = false;
				},
			});
	}

	public onIonInfiniteReviewList(ev: InfiniteScrollCustomEvent): void {
		if (this.pagination.currentPage! < this.pagination.totalPages!) {
			this.pagination.currentPage! += 1;
			this.getAllReviewsForFile();
			setTimeout(() => {
				ev.target.complete();
			}, 500);
		} else {
			ev.target.disabled = true;
		}
	}

	public onReviewDelete(event: boolean): void {
		if (event) {
			this.resetReviewListing();
		}
	}

	private resetReviewListing(): void {
		this.isLoaderActive = true;
		this.reviewsList = [];
		this.pagination.currentPage = 1;
		this.getAllReviewsForFile();
	}
}
