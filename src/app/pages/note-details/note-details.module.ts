import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NoteDetailsPageRoutingModule } from "./note-details-routing.module";

import { NoteDetailsPage } from "./note-details.page";
import { StarRatingModule } from "angular-star-rating";
import { SharedModule } from "src/app/core/shared/shared.module";
import { ViewNoteComponent } from "./view-note/view-note.component";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, NoteDetailsPageRoutingModule, StarRatingModule.forRoot(), SharedModule],
	declarations: [NoteDetailsPage, ViewNoteComponent],
})
export class NoteDetailsPageModule {}
