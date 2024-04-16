import { Pagination } from "../models";

export interface APIResponse<T> {
	data: T;
	status: number;
	message: string;
}
export interface AllUserRoles {
	id: number;
	roleType: string;
	color: string;
	createdAt: string;
	updatedAt: string;
}
export interface Years {
	id: number;
	year: number;
}

export interface RegistrationStep1 {
	fullName: string;
	email: string;
	password: string;
	profession: string;
	id: number;
}

export interface RegistrationStep2 {
	institute: string;
	place: string;
	graduationDate: string;
	graduationYear: number;
	qualificationsSummary: string;
}

export interface Login {
	email: string;
	password: string;
	token: string;
}

export interface FileThumbnail {
	id: number;
	thumbnailPath: string;
	fileId: number;
}

export interface AcademicDetails {
	id: number;
	userId: number;
	qualificationsSummary: string;
	institute: string;
	place: string;
	graduationDate: string;
	graduationYear: string;
}
export interface Notification {
	notificationList: NotificationList[];
	pagination: Pagination;
}

export interface NotificationList {
	id: number;
	userId: number;
	fileId: number;
	notificationDescription: string;
	fromUserId: number;
	isRead: boolean;
	notificationType: string;
	createdAt: string;
	updatedAt: string;
}

export interface Views {
	fileId: number;
	views: number;
}

export interface LikeFile {
	fileId: number;
	liked: boolean;
}
