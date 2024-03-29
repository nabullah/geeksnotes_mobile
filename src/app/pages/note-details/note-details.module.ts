import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NoteDetailsPageRoutingModule } from "./note-details-routing.module";

import { NoteDetailsPage } from "./note-details.page";
import { StarRatingModule } from "angular-star-rating";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, NoteDetailsPageRoutingModule, StarRatingModule.forRoot()],
	declarations: [NoteDetailsPage],
})
export class NoteDetailsPageModule {}
