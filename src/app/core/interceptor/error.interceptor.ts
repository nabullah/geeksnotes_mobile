import { ToastService } from "src/app/core/services/toast.service";
import { inject } from "@angular/core";
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { HTTP_ERROR_CODE } from "../enum/error-codes.enum";
import { HTTP_ERROR_MESSAGES } from "../constants/app.constants";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const toaster = inject(ToastService);
	return next(req).pipe(
		catchError((error: any) => {
			let errorMessage = "An unknown error occurred";

			if (error instanceof HttpErrorResponse) {
				if (error.error instanceof ErrorEvent) {
					// Client-side error
					errorMessage = `Client Error: ${error.error.message}`;
				} else if (error.status === HTTP_ERROR_CODE.Unknown) {
					toaster.presentToastError("top", HTTP_ERROR_MESSAGES.Unknown);
				} else if (error.status === HTTP_ERROR_CODE.BadRequest) {
					toaster.presentToastError("top", HTTP_ERROR_MESSAGES.BadRequest);
				} else if (error.status === HTTP_ERROR_CODE.Unauthorized) {
					toaster.presentToastError("top", HTTP_ERROR_MESSAGES.Unauthorized);
				} else if (error.status === HTTP_ERROR_CODE.Forbidden) {
					toaster.presentToastError("top", HTTP_ERROR_MESSAGES.Forbidden);
				} else if (error.status === HTTP_ERROR_CODE.NotFound) {
					toaster.presentToastError("top", HTTP_ERROR_MESSAGES.NotFound);
				} else if (error.status === HTTP_ERROR_CODE.InternalServerError) {
					toaster.presentToastError("top", HTTP_ERROR_MESSAGES.InternalServerError);
				} else if (error.status === HTTP_ERROR_CODE.GatewayTimeout) {
					toaster.presentToastError("top", HTTP_ERROR_MESSAGES.GatewayTimeout);
				} else if (error.status === HTTP_ERROR_CODE.UnprocessableEntity) {
					toaster.presentToastError("top", error.error.message);
				} else if (error.status === HTTP_ERROR_CODE.OK) {
					/**Empy block for ok status*/
				} else {
					errorMessage = `HTTP ${error.status}: ${error.statusText}`;
					console.log(errorMessage);
				}
			} else if (error instanceof Error) {
				// Other types of errors
				// errorMessage = `Error: ${error.message}`;
			}
			return throwError(() => {});
		})
	);
};
