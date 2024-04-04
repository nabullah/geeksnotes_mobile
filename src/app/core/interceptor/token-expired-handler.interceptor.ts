import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
// import Swal from "sweetalert2";
// import { RoutePath } from "../constants";
// import { CommonService } from "src/app/services/common.service";

export const tokenExpiredHandlerInterceptor: HttpInterceptorFn = (req, next) => {
	const route = inject(Router);
	// const commonService = inject(CommonService);

	return next(req).pipe(
		catchError((error) => {
			// if (error.error.error === "jwt expired") {
			// 	Swal.fire({
			// 		title: "Your session has expired. Do you want to login again?",
			// 		showDenyButton: true,
			// 		showCancelButton: false,
			// 		confirmButtonText: "Yes",
			// 		denyButtonText: `No`,
			// 		icon: "error",
			// 	}).then((result) => {
			// 		if (result.isConfirmed) {
			// 			commonService.logOut();
			// 			route.navigate([RoutePath.auth + "/" + RoutePath.login]);
			// 		} else if (result.isDenied) {
			// 			commonService.logOut();
			// 			route.navigate([RoutePath.notes]);
			// 		}
			// 	});
			// }
			return throwError(() => error);
		})
	);
};
