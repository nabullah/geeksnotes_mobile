import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NoteDetailsPage } from "./note-details.page";
import { ViewNoteComponent } from "./view-note/view-note.component";

const routes: Routes = [
	{
		path: ":id",
		component: NoteDetailsPage,
	},
	{
		path: ":id/reviews",
		loadChildren: () => import("./reviews/reviews.module").then((m) => m.ReviewsPageModule),
	},
	{ path: ":id/view", component: ViewNoteComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NoteDetailsPageRoutingModule {}
