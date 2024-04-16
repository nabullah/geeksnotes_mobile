import { environment } from "src/environments/environment";

export const APIURLS = {
	RegisterStep1: `${environment.API_URL}/user/registration/1`,
	RegisterStep2: `${environment.API_URL}/user/registration/2`,
	verifyOTP: `${environment.API_URL}/verifyOTP`,
	resendOTP: `${environment.API_URL}/resendOTP`,
	login: `${environment.API_URL}/user/login`,

	GetAllUserRoles: `${environment.API_URL}/user/getAllUserRoles`,

	// Upload Files
	UploadFilesSingle: `${environment.API_URL}/upload/uploadFilesSingle`,

	//Notes
	GetAllNotes: `${environment.API_URL}/notes/getAllNotes`,
	GetFilesWithUserId: `${environment.API_URL}/notes/getFilesWithUserId`,
	GetNoteById: `${environment.API_URL}/notes/getNoteById`,
	GetNoteLibraryOfUser: `${environment.API_URL}/notes/getLibraryNotes`,

	// Notifications
	GetNotificationsCount: `${environment.API_URL}/notifications/getNotificationsCount`,
	GetNotificationsList: `${environment.API_URL}/notifications/getNotifications`,
	MarkNotificationsAsRead: `${environment.API_URL}/notifications/markNotificationRead`,

	//View Note
	PostViewNote: `${environment.API_URL}/notes/view?fileId=`,
	PostLikeNote: `${environment.API_URL}/notes/like`,
	isNoteAlreadyLiked: `${environment.API_URL}/notes/like/isAlreadyLiked`,

	// Reviews
	CreateFileReview: `${environment.API_URL}/reviews/create`,
	UpdateFileReview: `${environment.API_URL}/reviews/update`,
	ListAllReviewsFile: `${environment.API_URL}/reviews/list`,
};
