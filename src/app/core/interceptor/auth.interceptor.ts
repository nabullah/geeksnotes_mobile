import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesPath } from "../routes/routes";
import { SignalService } from "../services/signal.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const token = getAuthorizationToken();
	const router = inject(Router);
	if (token) {
		const reqWithHeader = req.clone({
			headers: req.headers.set("authorization", `Bearer ${token}`),
		});
		return next(reqWithHeader);
	} else {
		// router.navigate([RoutesPath.Login]);
	}
	return next(req);
};

function getAuthorizationToken(): string {
	const signalService = inject(SignalService);
	return signalService.getToken();
}
