import { FileThumbnail, Views } from "../interface";
import { User } from "./user.model";
export class Notes {
	id?: number;
	filePath?: string;
	userId?: number;
	fileName?: string;
	fileSize?: string;
	topic?: string;
	subTopic?: string;
	description?: string;
	tags?: string;
	audienceRolesIds?: string;
	fileType?: string;
	isPrivate?: boolean;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
	likes?: number;
	user?: User;
	views?: Views;
	totalDownloads?: number;
	thumbnails?: FileThumbnail;
	constructor() {}
}

export class Pagination {
	totalItems?: number;
	totalPages?: number;
	currentPage?: number;
	limit?: number;
	constructor() {}
}
