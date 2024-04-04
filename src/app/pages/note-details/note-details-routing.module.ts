import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NoteDetailsPage } from "./note-details.page";

const routes: Routes = [
	{
		path: ":id",
		component: NoteDetailsPage,
	},
	{
		path: ":id/reviews",
		loadChildren: () => import("./reviews/reviews.module").then((m) => m.ReviewsPageModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NoteDetailsPageRoutingModule {}
