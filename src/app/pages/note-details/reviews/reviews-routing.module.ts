import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ReviewsPage } from "./reviews.page";
import { AddReviewComponent } from "./add-review/add-review.component";

const routes: Routes = [
	{
		path: "",
		component: ReviewsPage,
	},
	{
		path: "create",
		component: AddReviewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ReviewsPageRoutingModule {}
