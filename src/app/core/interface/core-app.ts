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

export interface Notes {
	id: number;
	filePath: string;
	userId: number;
	fileName: string;
	topic: string;
	subTopic: string;
	description: string;
	audienceRolesIds: string;
	fileType: string;
	isPrivate: boolean;
	createdAt: string;
	updatedAt: string;
	user: User;
	fileSize: string;
	likes: number;
	views: { fileId: number; views: number };
	tags: string;
}

export interface User {
	id: number;
	fullName: string;
	email: string;
	address: string | null;
	mobile: string | null;
	status: string;
	userRoleId: number;
	color: string;
	profession: string;
	academicsDetailId: number;
	dob: string | null;
	permission: string;
	isVerified: boolean;
	createdAt: string;
	updatedAt: string;
	academicDetails: AcademicDetails;
	role: string | null;
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

export interface Pagination {
	totalItems: number;
	totalPages: number;
	currentPage: number;
	limit?: number;
}
