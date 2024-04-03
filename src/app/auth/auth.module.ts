import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AuthPageRoutingModule } from "./auth-routing.module";

import { AuthPage } from "./auth.page";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ProfessionListModalComponent } from "../core/shared/profession-list-modal/profession-list-modal.component";
import { SharedModule } from "../core/shared/shared.module";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, AuthPageRoutingModule, ReactiveFormsModule, SharedModule],
	declarations: [AuthPage, RegisterComponent, LoginComponent],
})
export class AuthPageModule {}
