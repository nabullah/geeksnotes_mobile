import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AuthPageRoutingModule } from "./auth-routing.module";

import { AuthPage } from "./auth.page";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ProfessionListModalComponent } from "./register/profession-list-modal/profession-list-modal.component";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, AuthPageRoutingModule, ReactiveFormsModule],
	declarations: [AuthPage, RegisterComponent, LoginComponent, ProfessionListModalComponent],
})
export class AuthPageModule {}
