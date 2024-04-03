import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReviewsPageRoutingModule } from "./reviews-routing.module";

import { ReviewsPage } from "./reviews.page";
import { AddReviewComponent } from "./add-review/add-review.component";
import { StarRatingModule } from "angular-star-rating";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ReviewsPageRoutingModule, StarRatingModule.forRoot()],
	declarations: [ReviewsPage, AddReviewComponent],
})
export class ReviewsPageModule {}
