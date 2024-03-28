import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SegmentCustomEvent } from "@ionic/angular";
import { LibrarySegments } from "src/app/core/enum/segments.enum";
import { RoutesPath } from "src/app/core/routes/routes";
import { SignalService } from "src/app/core/services/signal.service";
import { SearchPage } from "../../search/search.page";
import { IonModal } from "@ionic/angular/common";

@Component({
	selector: "app-library",
	templateUrl: "./library.page.html",
	styleUrls: ["./library.page.scss"],
})
export class LibraryPage {
	public searchComponent = SearchPage;
	@ViewChild("sortByModal") sortByModal!: IonModal;

	public segmentsEnum = LibrarySegments;
	public segments: string;
	private routePaths = RoutesPath;

	constructor(private readonly router: Router) {
		this.segments = this.segmentsEnum.Library;
	}

	ionViewDidLeave(): void {
		this.segments = this.segmentsEnum.Library;
	}

	public segmentChanged(event: SegmentCustomEvent) {
		if (event.detail.value === this.segmentsEnum.Recents) {
			this.router.navigate([this.routePaths.LibraryRecents]);
			this.segments = this.segmentsEnum.Recents;
		} else {
			this.router.navigate([this.routePaths.LibraryList]);
			this.segments = this.segmentsEnum.Library;
		}
	}

	public routeToSearch() {
		this.router.navigate([this.routePaths.Search]);
	}

	public openSortByModal() {
		this.sortByModal.present();
	}
}
