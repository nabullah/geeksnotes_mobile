// import { GetterSetterService } from 'src/app/services/getter-setter.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { APPCONSTANTS } from "../constants/app.constants";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { RoutesPath } from "../routes/routes";
import { SignalService } from "./signal.service";
import { User } from "../models";
// import { APPCONSTANTS } from '../core/constants';

@Injectable({
	providedIn: "root",
})
export class CommonService {
	private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public __isLoggedIn = this.isLoggedIn$.asObservable();

	private setCurrentRoute$: BehaviorSubject<string> = new BehaviorSubject<string>("");
	public __currentRoute = this.setCurrentRoute$.asObservable();

	constructor(private readonly storageService: StorageService, private readonly router: Router, private readonly signalService: SignalService) {}

	public isUserLoggedIn() {
		const user = this.isLoggedIn$.getValue();
		if (!user) return false;
		return true;
	}

	public setUserLoggedIn(state: boolean) {
		this.isLoggedIn$.next(state);
	}

	public setCurrentRoute(route: string) {
		this.setCurrentRoute$.next(route);
	}

	public logOut() {
		this.storageService.remove(APPCONSTANTS.USER);
		this.storageService.remove(APPCONSTANTS.USER_ID);
		this.storageService.remove(APPCONSTANTS.TOKEN);
		this.storageService.removeAuthorizationToken();
		this.signalService.getUserObject.set(new User());

		this.setUserLoggedIn(false);
		this.router.navigate([RoutesPath.Login]);
	}

	public async autoLogin() {
		const user = await this.storageService.get(APPCONSTANTS.USER);
		if (user) {
			this.setUserLoggedIn(true);
		}
	}

	/**Generate year starting 1932 */
	public generateYear() {
		const years = [];
		const currentYear = new Date().getFullYear();
		const startYear = 1960;
		for (let i = currentYear; i >= startYear; i--) {
			years.push({ id: i, year: i });
		}
		return years;
	}

	/**Generate months in numbers */
	public generateMonth() {
		const months = [...Array(12)].map((_, index) => {
			const monthNumber = index + 1;
			return monthNumber < 10 ? `0${monthNumber}` : monthNumber.toString();
		});
		return months;
	}
}
