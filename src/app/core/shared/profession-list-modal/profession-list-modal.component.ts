import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AllUserRoles } from "src/app/core/interface";

@Component({
	selector: "app-profession-list-modal",
	templateUrl: "./profession-list-modal.component.html",
	styleUrls: ["./profession-list-modal.component.scss"],
})
export class ProfessionListModalComponent {
	@Input() allProfessions: AllUserRoles[];
	@Input() filterProfessional: string;

	@Output() emitSelectedProfession: EventEmitter<AllUserRoles> = new EventEmitter<AllUserRoles>();
	constructor() {
		this.allProfessions = [];
		this.filterProfessional = "";
	}

	public selectedProfession(item: AllUserRoles) {
		this.emitSelectedProfession.emit(item);
	}
}
