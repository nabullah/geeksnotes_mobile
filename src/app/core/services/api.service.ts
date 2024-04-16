import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";
import { APIResponse, AllUserRoles, LikeFile, Login, RegistrationStep1, RegistrationStep2 } from "../interface";
import { APIURLS } from "../constants/api-endpoints";
import { Notes, Reviews } from "../models";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private http: HttpClient) {}

	// Authentication
	registrationStep1(data: RegistrationStep1): Observable<APIResponse<{ id: number }>> {
		return this.http.post<APIResponse<{ id: number }>>(APIURLS.RegisterStep1, data);
	}
	registrationStep2(data: RegistrationStep2): Observable<APIResponse<RegistrationStep2>> {
		return this.http.post<APIResponse<RegistrationStep2>>(APIURLS.RegisterStep2, data);
	}
	getAllUserRoles(): Observable<APIResponse<AllUserRoles[]>> {
		return this.http.get<APIResponse<AllUserRoles[]>>(APIURLS.GetAllUserRoles);
	}
	verifyOTP(otp: object): Observable<object> {
		return this.http.post(APIURLS.verifyOTP, otp);
	}
	resendOTP(email: { email: string }): Observable<object> {
		return this.http.post(APIURLS.resendOTP, email);
	}
	loginUser(data: Login): Observable<object> {
		return this.http.post(APIURLS.login, data);
	}

	// Notes Related APIs
	getAllNotes(): Observable<APIResponse<string>> {
		return this.http.get<APIResponse<string>>(APIURLS.GetAllNotes);
	}
	uploadFilesSingle(data: FormData): Observable<HttpEvent<APIResponse<string>>> {
		return this.http.post<APIResponse<string>>(APIURLS.UploadFilesSingle, data, {
			reportProgress: true,
			observe: "events",
		});
	}
	getFilesWithUserId(page: number, limit: number): Observable<APIResponse<string>> {
		return this.http.get<APIResponse<string>>(`${APIURLS.GetFilesWithUserId}?page=${page}&limit=${limit}`);
	}
	getNoteById(id: number): Observable<APIResponse<string>> {
		return this.http.get<APIResponse<string>>(`${APIURLS.GetNoteById}?id=${id}`);
	}
	getNoteLibraryList(): Observable<APIResponse<{ [key: string]: Notes }>> {
		return this.http.get<APIResponse<{ [key: string]: Notes }>>(`${APIURLS.GetNoteLibraryOfUser}`);
	}

	// Notifications related APIs
	getNotificationsList(page: number, limit: number): Observable<APIResponse<Notification>> {
		return this.http.get<APIResponse<Notification>>(`${APIURLS.GetNotificationsList}?page=${page}&limit=${limit}`);
	}
	getNotificationsCount(): Observable<number> {
		return this.http.get<number>(`${APIURLS.GetNotificationsCount}`);
	}
	markNotificationAsRead(id: string | number): Observable<boolean> {
		return this.http.get<boolean>(`${APIURLS.MarkNotificationsAsRead}?id=${id}`);
	}

	// Get Total Views of a note API
	postViewNote(id: number): Observable<APIResponse<{ [key: string]: number }>> {
		return this.http.get<APIResponse<{ [key: string]: number }>>(APIURLS.PostViewNote + id);
	}

	// Like related APIs
	postLikeNote(payload: { [key: string]: number }): Observable<APIResponse<LikeFile>> {
		return this.http.get<APIResponse<LikeFile>>(`${APIURLS.PostLikeNote}?fileId=${payload["fileId"]}&userId=${payload["userId"]}`);
	}
	checkIsNoteLiked(payload: { [key: string]: number }): Observable<APIResponse<LikeFile>> {
		return this.http
			.get<APIResponse<LikeFile>>(`${APIURLS.isNoteAlreadyLiked}?fileId=${payload["fileId"]}&userId=${payload["userId"]}`)
			.pipe(retry(3));
	}

	// Reviews Related APIs
	createFileReview(payload: { [key: string]: any }): Observable<APIResponse<Reviews>> {
		return this.http.post<APIResponse<Reviews>>(APIURLS.CreateFileReview, payload);
	}
	updateFileReview(payload: { [key: string]: any }): Observable<APIResponse<Reviews>> {
		return this.http.post<APIResponse<Reviews>>(APIURLS.UpdateFileReview, payload);
	}
	listFileReviewsWithId(fileId: number): Observable<APIResponse<Reviews>> {
		return this.http.get<APIResponse<Reviews>>(`${APIURLS.ListAllReviewsFile}?fileId=${fileId}`);
	}
}
