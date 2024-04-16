import { User } from "./user.model";

export class Reviews {
	id?: number;
	userId?: number;
	fileId?: number;
	reviewText?: string;
	createdAt?: string;
	updatedAt?: string;
	ratings?: Ratings;
	user?: User;
	constructor() {}
}

export class Ratings {
	rating?: string;
	reviewId?: number;
	constructor() {}
}
