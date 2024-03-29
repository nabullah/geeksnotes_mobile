import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NotesPageRoutingModule } from "./notes-routing.module";
import { NotesPage } from "./notes.page";
import { SharedModule } from "src/app/core/shared/shared.module";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, NotesPageRoutingModule, SharedModule],
	declarations: [NotesPage],
})
export class NotesListingPageModule {}
