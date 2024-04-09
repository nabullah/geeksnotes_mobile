import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { APPCONSTANTS } from "../constants/app.constants";
import { Router } from "@angular/router";
import { RoutesPath } from "../routes/routes";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const token = getAuthorizationToken();
	const router = inject(Router);
	if (token) {
		const reqWithHeader = req.clone({
			headers: req.headers.set("authorization", `Bearer ${token}`),
		});
		return next(reqWithHeader);
	} else {
		router.navigate([RoutesPath.Login]);
	}
	return next(req);
};

async function getAuthorizationToken() {
	const storageService = inject(StorageService);
	return await storageService.get(APPCONSTANTS.USER);
}
