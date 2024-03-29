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
	public readonly SearchComponent = SearchPage;
	@ViewChild("sortByModal") sortByModal!: IonModal;

	public segmentsEnum = LibrarySegments;
	public segments: string;

	constructor(private readonly router: Router) {
		this.segments = this.segmentsEnum.Library;
	}

	ionViewDidLeave(): void {
		this.segments = this.segmentsEnum.Library;
	}

	public segmentChanged(event: SegmentCustomEvent) {
		if (event.detail.value === this.segmentsEnum.Recents) {
			this.router.navigate([RoutesPath.LibraryRecents]);
			this.segments = this.segmentsEnum.Recents;
		} else {
			this.router.navigate([RoutesPath.LibraryList]);
			this.segments = this.segmentsEnum.Library;
		}
	}

	public routeToSearch() {
		this.router.navigate([RoutesPath.Search]);
	}

	public openSortByModal() {
		this.sortByModal.present();
	}
}
