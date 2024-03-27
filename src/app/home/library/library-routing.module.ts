import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LibraryPage } from "./library.page";
import { LibraryListComponent } from "./library-list/library-list.component";
import { LibraryRecentsComponent } from "./library-recents/library-recents.component";

const routes: Routes = [
	{
		path: "",
		component: LibraryPage,
		children: [
			{
				path: "",
				redirectTo: "list",
				pathMatch: "full",
			},
			{
				path: "list",
				component: LibraryListComponent,
			},
			{
				path: "recents",
				component: LibraryRecentsComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LibraryPageRoutingModule {}
