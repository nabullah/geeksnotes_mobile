import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotesListingComponent } from "./notes-listing/notes-listing.component";
import { IonicModule } from "@ionic/angular";

const COMPOENTS: Array<any> = [NotesListingComponent];
@NgModule({
	declarations: [COMPOENTS],
	imports: [CommonModule, IonicModule],
	exports: [COMPOENTS],
})
export class SharedModule {}
