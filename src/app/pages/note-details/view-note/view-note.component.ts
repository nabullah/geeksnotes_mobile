import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PDFProgressData } from "ng2-pdf-viewer";
import { PdfViewerError } from "src/app/core/interface/pdf-viewer";
import { Notes } from "src/app/core/models";
import { RoutesPath } from "src/app/core/routes/routes";
import { SignalService } from "src/app/core/services/signal.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
	selector: "app-view-note",
	templateUrl: "./view-note.component.html",
	styleUrls: ["./view-note.component.scss"],
})
export class ViewNoteComponent {
	public isLoaderActive: boolean;
	public notesDetail: Notes;
	constructor(
		private readonly signalService: SignalService,
		private readonly router: Router,
		private readonly toast: ToastService,
		private readonly activatedRoute: ActivatedRoute
	) {
		this.isLoaderActive = false;
		this.notesDetail = new Notes();
	}

	ionViewWillEnter() {
		this.isLoaderActive = true;
		this.notesDetail = this.signalService.currentViewNoteData();

		if (!this.notesDetail.filePath) {
			this.router.navigate([RoutesPath.Notes]);
		}
		console.log("currentNotes >>", this.notesDetail);
	}

	public afterPDFLoaded(event: PDFProgressData) {
		if (event.loaded === event.total) {
			this.isLoaderActive = false;
		}
	}

	public onPDFLoadError(event: PdfViewerError) {
		this.toast.presentToastError("top", event.message);
		const returnUrl = this.activatedRoute.snapshot.queryParams["return"];
		this.router.navigate([RoutesPath.NotesDetails + "/" + returnUrl]);
	}
}
