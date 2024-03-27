import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IonDatetime, IonDatetimeButton } from "@ionic/angular";
import { IonModal } from "@ionic/angular/common";
import { swipeAnimation } from "src/app/core/animations/swipe.animation";
import { RoutesPath } from "src/app/core/routes/routes";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
	animations: [swipeAnimation],
})
export class RegisterComponent implements OnInit {
	public registerForm!: FormGroup;
	public registerFormTwo!: FormGroup;
	public formIndex: number;
	public submitted: boolean;

	public swipeDirection: number;

	public routes = RoutesPath;

	constructor(private readonly fb: FormBuilder, private readonly router: Router) {
		this.submitted = false;
		this.formIndex = 1;
		this.swipeDirection = 0;
	}

	ngOnInit() {
		this.initializeRegistrationForm();
		this.initializeRegistrationFormTwo();
	}

	get f() {
		return this.registerForm.controls;
	}
	get g() {
		return this.registerFormTwo.controls;
	}

	private initializeRegistrationForm() {
		this.registerForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required, Validators.minLength(6)]],
			fullName: ["", [Validators.required]],
			profession: ["", [Validators.required]],
		});
	}

	private initializeRegistrationFormTwo() {
		this.registerFormTwo = this.fb.group({
			institute: ["", [Validators.required]],
			place: ["", [Validators.required]],
			graduationDate: ["", [Validators.required]],
			graduationYear: ["", [Validators.required]],
			qualificationsSummary: ["", [Validators.required]],
		});
	}

	public submitFormOne() {
		this.formIndex = 3;
		console.info("Form 1 >> ", this.registerForm.value);
	}

	public selectGraduationDate(event: CustomEvent) {
		this.registerFormTwo.controls["graduationDate"].setValue(new Date(event.detail.value).toDateString());
	}

	public selectGraduationYear(event: CustomEvent) {
		this.registerFormTwo.controls["graduationYear"].setValue(new Date(event.detail.value).getFullYear());
	}

	public getGraduationDateCalender(dateRef: IonModal) {
		dateRef.present();
	}

	public getGraduationYearCalender(dateRef: IonModal) {
		dateRef.present();
	}

	public submitFormTwo() {
		console.info("Form 2 >> ", this.registerFormTwo.value);
		this.router.navigate([RoutesPath.Dashboard]);
	}
}
