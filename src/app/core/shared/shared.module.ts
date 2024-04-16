import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotesListingComponent } from "./notes-listing/notes-listing.component";
import { IonicModule } from "@ionic/angular";
import { OneTimePasswordComponent } from "./one-time-password/one-time-password.component";
import { FormsModule } from "@angular/forms";
import { LoaderComponent } from "./loader/loader.component";
import { ProfessionListModalComponent } from "./profession-list-modal/profession-list-modal.component";
import { FilterPipe } from "../pipe/filter.pipe";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { PdfViewerCustomComponent } from "./pdf-viewer/pdf-viewer.component";
import { ReviewsListComponent } from "./reviews-list/reviews-list.component";
import { TimeAgoPipe } from "../pipe/time-ago.pipe";
import { StarRatingModule } from "angular-star-rating";

const COMPONENTS: Array<any> = [
	NotesListingComponent,
	OneTimePasswordComponent,
	LoaderComponent,
	ProfessionListModalComponent,
	PdfViewerCustomComponent,
	ReviewsListComponent,
];
@NgModule({
	declarations: [COMPONENTS, FilterPipe, TimeAgoPipe],
	imports: [CommonModule, IonicModule, FormsModule, PdfViewerModule, StarRatingModule.forRoot()],
	exports: [COMPONENTS],
})
export class SharedModule {}
