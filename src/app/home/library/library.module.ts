import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LibraryPageRoutingModule } from "./library-routing.module";

import { LibraryPage } from "./library.page";
import { LibraryRecentsComponent } from "./library-recents/library-recents.component";
import { LibraryListComponent } from "./library-list/library-list.component";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, LibraryPageRoutingModule],
	declarations: [LibraryPage, LibraryRecentsComponent, LibraryListComponent],
})
export class LibraryPageModule {}
