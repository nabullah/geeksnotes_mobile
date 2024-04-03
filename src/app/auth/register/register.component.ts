import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IonModal } from "@ionic/angular/common";
import { inOutAnimation, swipeAnimation } from "src/app/core/animations/swipe.animation";
import { APPCONSTANTS } from "src/app/core/constants/app.constants";
import { APIResponse, AllUserRoles, RegistrationStep1, RegistrationStep2 } from "src/app/core/interface";
import { RoutesPath } from "src/app/core/routes/routes";
import { ApiService } from "src/app/core/services/api.service";
import { StorageService } from "src/app/core/services/storage.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
	animations: [swipeAnimation, inOutAnimation],
})
export class RegisterComponent implements OnInit {
	public registerForm!: FormGroup;
	public registerFormTwo!: FormGroup;
	public formIndex: number;
	public submitted: boolean;

	public userId: number;
	public isLoaderActive: boolean;
	public filterSearchText: string;

	public swipeDirection: number;

	public routes = RoutesPath;

	public allUserRoles: AllUserRoles[];

	@ViewChild("professionModal", { static: false }) professionModal!: IonModal;

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly apiService: ApiService,
		private readonly toastService: ToastService,
		private readonly storageService: StorageService
	) {
		this.allUserRoles = [];
		this.submitted = false;
		this.isLoaderActive = false;
		this.formIndex = 4;
		this.swipeDirection = 0;
		this.userId = 0;
		this.filterSearchText = "";
	}

	ngOnInit(): void {
		this.initializeRegistrationForm();
		this.initializeRegistrationFormTwo();
		this.getProfessionsList();
	}

	get f() {
		return this.registerForm.controls;
	}
	get g() {
		return this.registerFormTwo.controls;
	}

	private initializeRegistrationForm(): void {
		this.registerForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required, Validators.minLength(6)]],
			fullName: ["", [Validators.required]],
			profession: ["", [Validators.required]],
			userRoleId: ["", [Validators.required]],
		});
	}

	private initializeRegistrationFormTwo(): void {
		this.registerFormTwo = this.fb.group({
			institute: ["", [Validators.required]],
			place: ["", [Validators.required]],
			graduationDate: ["", [Validators.required]],
			graduationYear: ["", [Validators.required]],
			qualificationsSummary: ["", [Validators.required]],
		});
	}

	public changeInitialForm(): void {
		if (!this.registerForm.value.email && !this.registerForm.value.password) {
			this.toastService.presentToastCustom("warning", "bottom", "Please fill all the required fields");
			return;
		}
		this.formIndex = 2;
	}

	public submitFormOne(): void {
		this.isLoaderActive = true;
		this.apiService.registrationStep1(this.registerForm.value).subscribe({
			next: (res: APIResponse<{ id: number }>) => {
				if (res.status) {
					this.formIndex = 3;
					this.userId = res.data.id;
					this.storageService.set(APPCONSTANTS.USER_ID, this.userId);
					this.storageService.set(APPCONSTANTS.TEMP_EMAIL, this.registerForm.value.email);
					this.toastService.presentToastSuccess("top", res.message);
				} else {
					this.toastService.presentToastError("top", res.message);
				}
			},
			error: (err) => {
				console.log(err);
				this.toastService.presentToastError("top", err.error.message);
			},
			complete: () => {
				this.isLoaderActive = false;
			},
		});
	}

	public selectGraduationDate(event: CustomEvent): void {
		this.registerFormTwo.controls["graduationDate"].setValue(new Date(event.detail.value).toDateString());
		this.registerFormTwo.controls["graduationYear"].setValue(new Date(event.detail.value).getFullYear());

	}

	public selectGraduationYear(event: CustomEvent): void {
		this.registerFormTwo.controls["graduationYear"].setValue(new Date(event.detail.value).getFullYear());
	}

	public getGraduationDateCalender(dateRef: IonModal): void {
		dateRef.present();
	}

	public getGraduationYearCalender(dateRef: IonModal): void {
		dateRef.present();
	}

	public submitFormTwo(): void {
		this.isLoaderActive = true;
		const payload = {
			...this.registerFormTwo.value,
			userId: 28,
		};
		this.apiService.registrationStep2(payload).subscribe({
			next: (res: APIResponse<RegistrationStep2>) => {
				if (res.status) {
					this.registerForm.reset();
					this.registerFormTwo.reset();
					this.toastService.presentToastSuccess("top", res.message);
					this.router.navigate([RoutesPath.Dashboard]);
					this.storageService.set(APPCONSTANTS.USER, res.data);
				} else {
					this.toastService.presentToastError("top", res.message);
				}
			},
			error: (err) => {
				console.log(err);
				this.toastService.presentToastError("top", err.error.message);
			},
			complete: () => {
				this.isLoaderActive = false;
			},
		});
	}

	public verifyOTP(value: string): void {
		this.isLoaderActive = true;
		this.apiService.verifyOTP({ userId: this.userId, otp: value }).subscribe({
			next: (res: any) => {
				if (res.status) {
					this.toastService.presentToastSuccess("bottom", res.message);
					this.formIndex = 4;
				} else {
					this.toastService.presentToastError("bottom", res.message);
				}
			},
			error: (err) => {
				console.log(err);
				this.toastService.presentToastError("bottom", err.error.message);
			},
			complete: () => {
				this.isLoaderActive = false;
			},
		});
	}

	public getProfessionsList(): void {
		this.apiService.getAllUserRoles().subscribe({
			next: (res: APIResponse<AllUserRoles[]>) => {
				if (res.status) {
					this.allUserRoles = res.data;
				}
			},
		});
	}

	public handleSearchInput(event: CustomEvent): void {
		this.filterSearchText = event.detail.value;
	}

	public getSelectedProfession(event: AllUserRoles) {
		this.registerForm.controls["profession"].setValue(event.roleType);
		this.registerForm.controls["userRoleId"].setValue(event.id);
		this.filterSearchText = "";
		this.professionModal.dismiss();
	}
}
