import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SegmentCustomEvent } from "@ionic/angular";
import { LibrarySegments } from "src/app/core/enum/segments.enum";
import { RoutesPath } from "src/app/core/routes/routes";
import { SignalService } from "src/app/core/services/signal.service";

@Component({
	selector: "app-library",
	templateUrl: "./library.page.html",
	styleUrls: ["./library.page.scss"],
})
export class LibraryPage {
	segmentsEnum = LibrarySegments;
	segments: string;
	routePaths = RoutesPath;
	constructor(private readonly router: Router) {
		this.segments = this.segmentsEnum.Library;
	}

	segmentChanged(event: SegmentCustomEvent) {
		if (event.detail.value === this.segmentsEnum.Recents) {
			this.router.navigate([this.routePaths.LibraryRecents]);
			this.segments = this.segmentsEnum.Recents;
		} else {
			this.router.navigate([this.routePaths.LibraryList]);
			this.segments = this.segmentsEnum.Library;
		}
	}

	ionViewDidLeave(): void {
		this.segments = this.segmentsEnum.Library;
	}
}
