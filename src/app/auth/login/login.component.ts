import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { APPCONSTANTS } from "src/app/core/constants/app.constants";
import { RoutesPath } from "src/app/core/routes/routes";
import { ApiService } from "src/app/core/services/api.service";
import { CommonService } from "src/app/core/services/common.service";
import { StorageService } from "src/app/core/services/storage.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	public loginForm!: FormGroup;
	public submitted: boolean;

	public routes = RoutesPath;
	public isLoaderActive: boolean;

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly toastService: ToastService,
		private readonly storageService: StorageService,
		private readonly apiService: ApiService,
		private readonly commonService: CommonService,
		private readonly activatedRoute: ActivatedRoute
	) {
		this.submitted = false;
		this.isLoaderActive = false;
	}

	ngOnInit(): void {
		this.initializeLoginForm();
	}

	private initializeLoginForm() {
		this.loginForm = this.fb.group({
			email: ["nansari@anviam.com", [Validators.required, Validators.email]],
			password: ["12345678", [Validators.required, Validators.minLength(6)]],
		});
	}

	get f() {
		return this.loginForm.controls;
	}

	public submitLogin() {
		if (this.loginForm.invalid) {
			this.toastService.presentToastCustom("tertiary", "bottom", "Please fill all the required fields");
			return;
		}
		this.isLoaderActive = true;
		this.apiService.loginUser({ ...this.loginForm.value, fcmToken: "" }).subscribe({
			next: (res: any) => {
				if (res.status) {
					this.storageService.set(APPCONSTANTS.USER_ID, res.data.user.id);
					this.storageService.set(APPCONSTANTS.USER, res.data.user);
					this.commonService.setUserLoggedIn(true);

					const returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || RoutesPath.Notes;
					this.router.navigate([returnUrl]);
					this.toastService.presentToastSuccess("top", res.message);
				} else {
					this.toastService.presentToastError("top", res.message);
				}
			},
			error: () => {
				this.isLoaderActive = false;
			},
			complete: () => {
				this.isLoaderActive = false;
			},
		});
	}
}
