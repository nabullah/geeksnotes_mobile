import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { APPCONSTANTS } from "../constants/app.constants";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const token = getAuthorizationToken();
	if (token) {
		const reqWithHeader = req.clone({
			headers: req.headers.set("authorization", `Bearer ${token}`),
		});
		return next(reqWithHeader);
	}
	return next(req);
};

async function getAuthorizationToken() {
	const storageService = inject(StorageService);
	return await storageService.get(APPCONSTANTS.USER);
}
