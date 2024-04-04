import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotesListingComponent } from "./notes-listing/notes-listing.component";
import { IonicModule } from "@ionic/angular";
import { OneTimePasswordComponent } from "./one-time-password/one-time-password.component";
import { FormsModule } from "@angular/forms";
import { LoaderComponent } from "./loader/loader.component";
import { ProfessionListModalComponent } from "./profession-list-modal/profession-list-modal.component";
import { FilterPipe } from "../pipe/filter.pipe";

const COMPONENTS: Array<any> = [NotesListingComponent, OneTimePasswordComponent, LoaderComponent, ProfessionListModalComponent];
@NgModule({
	declarations: [COMPONENTS, FilterPipe],
	imports: [CommonModule, IonicModule, FormsModule],
	exports: [COMPONENTS],
})
export class SharedModule {}
