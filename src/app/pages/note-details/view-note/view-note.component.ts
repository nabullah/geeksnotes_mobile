import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IonModal, RangeCustomEvent } from "@ionic/angular";
import { RangeValue, SearchbarCustomEvent } from "@ionic/core";
import { PDFProgressData } from "ng2-pdf-viewer";
import { APIResponse } from "src/app/core/interface";
import { PdfViewerError } from "src/app/core/interface/pdf-viewer";
import { Notes } from "src/app/core/models";
import { RoutesPath } from "src/app/core/routes/routes";
import { ApiService } from "src/app/core/services/api.service";
import { SignalService } from "src/app/core/services/signal.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
	selector: "app-view-note",
	templateUrl: "./view-note.component.html",
	styleUrls: ["./view-note.component.scss"],
})
export class ViewNoteComponent {
	@ViewChild("modalSearch") modalSearch!: IonModal;
	@ViewChild("modalZoom") modalZoom!: IonModal;

	public isLoaderActive: boolean;
	public notesDetail: Notes;
	public filePath: string;
	public lastEmittedValue: number;
	public searchStringInFile: string;
	constructor(
		private readonly signalService: SignalService,
		private readonly router: Router,
		private readonly toast: ToastService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly apiService: ApiService
	) {
		this.isLoaderActive = false;
		this.notesDetail = new Notes();

		this.filePath = "";
		this.lastEmittedValue = 0;
		this.searchStringInFile = "";
	}

	ionViewWillEnter(): void {
		this.isLoaderActive = true;
		this.notesDetail = this.signalService.currentViewNoteData();
		this.filePath = this.getSourceUrlAddProtocol(this.notesDetail.filePath!);

		if (!this.notesDetail.filePath) {
			this.router.navigate([RoutesPath.Notes]);
		}
		console.log("currentNotes >>", this.notesDetail);
		this.postViewNote();
	}

	public afterPDFLoaded(event: PDFProgressData): void {
		if (event.loaded === event.total) {
			this.isLoaderActive = false;
		}
	}

	public onPDFLoadError(event: PdfViewerError): void {
		this.toast.presentToastError("top", event.message);
		const returnUrl = this.activatedRoute.snapshot.queryParams["return"];
		this.router.navigate([RoutesPath.NotesDetails + "/" + returnUrl]);
	}

	public getSourceUrlAddProtocol(src: string): string {
		if (src && (src.includes("http") || src.includes("https"))) {
			return src;
		} else {
			return "https://" + src;
		}
	}

	public openSearchModal(): void {
		this.modalSearch.present();
	}

	public handleSearchOnPDFInput(event: SearchbarCustomEvent): void {
		console.log("handleSearchOnPDFInput >>", event.detail.value);
		this.searchStringInFile = event.detail.value!;
	}

	public pinFormatter(value: number): string {
		return `${value}%`;
	}

	public handleZoomRangeChange(ev: CustomEvent): void {
		this.lastEmittedValue = ev.detail.value;
	}

	public setDocFitToPage(): void {
		this.lastEmittedValue = 1;
	}

	private postViewNote(): void {
		this.apiService.postViewNote(this.notesDetail.id!).subscribe({
			next: (response: APIResponse<{ [key: string]: number }>) => {
				console.log("postViewNote response >>", response);
			},
			error: (error) => {
				console.log("postViewNote error >>", error);
			},
		});
	}
}
