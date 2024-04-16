import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { ToastService } from "../services/toast.service";
import { RoutesPath } from "../routes/routes";

export const tokenExpiredHandlerInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);
	const toast = inject(ToastService);

	return next(req).pipe(
		catchError((error) => {
			if (error?.error?.error === "jwt expired") {
				toast.presentToastCustom("warning", "top", "Your session has expired. Please login again");
				router.navigate([RoutesPath.Login], { queryParams: { returnUrl: router.url } });
			}
			return throwError(() => error);
		})
	);
};
