import { HttpInterceptorFn } from "@angular/common/http";
// import { GETSETCONST } from "../constants";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	// const token: string = JSON.parse(localStorage.getItem(GETSETCONST.USER)!)?.token;
	// if (token) {
	// 	const reqWithHeader = req.clone({
	// 		headers: req.headers.set("authorization", `Bearer ${token}`),
	// 	});
	// 	return next(reqWithHeader);
	// }
	return next(req);
};
