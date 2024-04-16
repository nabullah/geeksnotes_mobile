import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { PDFDocumentProxy, PDFProgressData } from "ng2-pdf-viewer";
import { PdfViewerComponent } from "ng2-pdf-viewer";

@Component({
	selector: "app-pdf-viewer",
	templateUrl: "./pdf-viewer.component.html",
	styleUrls: ["./pdf-viewer.component.scss"],
})
export class PdfViewerCustomComponent implements OnChanges {
	@Input() source: string;
	@Input() page: number;
	@Input() stickToPage: boolean;
	@Input() showAll: boolean;
	@Input() renderText: boolean;
	@Input() originalSize: boolean;
	@Input() fitToPage: boolean;
	@Input() width: string;
	@Input() height: string;
	@Input() autoresize: boolean;
	@Input() showBorders: boolean;
	@Input() zoomValue: number;

	@Input() searchQueryInPDF: string;

	// Get PDF information with callback
	@Output() afterPDFLoaded: EventEmitter<any>;

	// Get event when a page is rendered. Called for every page rendered.
	@Output() afterPageRendered: EventEmitter<any>;

	// Get event when the pages are initialized.
	@Output() afterPagesInitialized: EventEmitter<any>;

	// Get event when a text layer is rendered.
	@Output() afterTextLayerRendered: EventEmitter<any>;

	//Error handling callback
	@Output() errorResponse: EventEmitter<any>;

	//Error handling callback
	@Output() loadingPDFProgress: EventEmitter<PDFProgressData>;

	// Refrence of PDF Viewer from package
	@ViewChild(PdfViewerComponent) private pdfComponent!: PdfViewerComponent;

	constructor() {
		this.afterPDFLoaded = new EventEmitter();
		this.afterPageRendered = new EventEmitter();
		this.afterPagesInitialized = new EventEmitter();
		this.afterTextLayerRendered = new EventEmitter();
		this.errorResponse = new EventEmitter();
		this.loadingPDFProgress = new EventEmitter();

		this.source = "";
		this.page = 1;
		this.stickToPage = false;
		this.showAll = true;
		this.renderText = true;
		this.zoomValue = 1;
		this.originalSize = true;
		this.fitToPage = true;

		/**To make [autoresize] work - make sure that [original-size]="false" and pdf-viewer tag has max-width or display are set. */
		this.autoresize = false;
		this.showBorders = false;

		this.width = "100%";
		this.height = "100%";

		this.searchQueryInPDF = "";
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes["searchQueryInPDF"]?.currentValue != changes["searchQueryInPDF"]?.previousValue) {
			this.search(changes["searchQueryInPDF"].currentValue);
		}
	}

	public afterLoadComplete(e: PDFDocumentProxy) {
		this.afterPDFLoaded.emit(e);
	}

	public pageRendered(e: CustomEvent) {
		this.afterPageRendered.emit(e);
	}

	public pageInitialized(e: CustomEvent) {
		this.afterPagesInitialized.emit(e);
	}

	public textLayerRendered(e: CustomEvent) {
		this.afterTextLayerRendered.emit(e);
	}

	public onErrorOccured(error: any) {
		this.errorResponse.emit(error);
	}

	public onProgress(progressData: PDFProgressData) {
		this.loadingPDFProgress.emit(progressData);
	}

	private search(stringToSearch: string) {
		this.pdfComponent?.eventBus.dispatch("find", {
			query: stringToSearch,
			type: "again",
			caseSensitive: false,
			findPrevious: undefined,
			highlightAll: true,
			phraseSearch: true,
		});
	}
}
