import { FileThumbnail, User } from "../interface";
export class Notes {
	id?: number;
	filePath: string;
	userId: number | null;
	fileName: string | null;
	fileSize: string | null;
	topic: string;
	subTopic: string;
	description: string;
	tags: string;
	audienceRolesIds: string | null;
	fileType: string | null;
	isPrivate: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	likes?: number;
	user?: User | null;
	views?: number;
	totalDownloads?: number;
	thumbnail?: FileThumbnail
	constructor() {
		this.filePath = "";
		this.userId = null;
		this.fileName = "";
		this.fileSize = null;
		this.topic = "";
		this.subTopic = "";
		this.description = "";
		this.tags = "";
		this.audienceRolesIds = null;
		this.fileType = null;
		this.isPrivate = false;
		this.createdAt = "";
		this.updatedAt = "";
		this.deletedAt = "";
		this.likes = 0;
		this.user = null;
		this.views = 0;
		this.totalDownloads = 0;
	}
}
