import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RoutesPath } from "src/app/core/routes/routes";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	public loginForm!: FormGroup;
	public submitted: boolean;

	public routes = RoutesPath;

	constructor(private readonly fb: FormBuilder, private readonly router: Router) {
		this.submitted = false;
	}

	ngOnInit(): void {
		this.initializeLoginForm();
	}

	private initializeLoginForm() {
		this.loginForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required, Validators.minLength(6)]],
		});
	}

	get f() {
		return this.loginForm.controls;
	}

	public submitLogin() {
		this.router.navigate([RoutesPath.Dashboard]);
	}
}
