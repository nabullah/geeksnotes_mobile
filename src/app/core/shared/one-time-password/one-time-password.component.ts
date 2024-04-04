import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren, input } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { APPCONSTANTS } from "../../constants/app.constants";
import { StorageService } from "../../services/storage.service";
import { ToastService } from "../../services/toast.service";

@Component({
	selector: "app-one-time-password",
	templateUrl: "./one-time-password.component.html",
	styleUrls: ["./one-time-password.component.scss"],
})
export class OneTimePasswordComponent implements OnInit {
	@Output() getOTP: EventEmitter<string> = new EventEmitter<string>();

	public readonly inputs: string[] = ["input1", "input2", "input3", "input4", "input5", "input6"];
	public inputValues: string[];
	public finalValues!: string;
	public isResendOTP: boolean;

	public timer: number;
	public minutes: string;
	public seconds: string;
	public timerExpired: boolean;
	public timerInterval: any;

	public isLoaderActive: boolean;
	@ViewChildren("input") inputElements!: QueryList<any>;

	constructor(private readonly apiService: ApiService, private readonly storageService: StorageService, private readonly toastService: ToastService) {
		this.isLoaderActive = false;

		this.inputValues = ["", "", "", "", "", ""];
		this.isResendOTP = false;

		this.timer = 300;
		this.minutes = "00";
		this.seconds = "00";
		this.timerExpired = false;
	}

	ngOnInit(): void {
		this.startTimer();
	}

	public onValueChange(event: Event, index: number) {
		const inputElement = event.target as HTMLInputElement;
		this.digitValidate(inputElement);
		this.tabChange(index);
	}

	private digitValidate(element: HTMLInputElement): void {
		const inputValue = element.value.replace(/[^a-zA-Z0-9]/g, "");
		element.value = inputValue.toUpperCase();
	}

	private tabChange(index: number): void {
		const inputElementArray = this.inputElements.toArray();
		if (index !== 5 && inputElementArray[index + 1] && inputElementArray[index + 1].value !== "") {
			this.focusElement(inputElementArray[index + 1]);
		} else {
			this.focusElement(inputElementArray[index]);
		}
	}

	public onBackspace(event: any, index: number) {
		if (event.code === "Backspace") {
			const inputElementArray = this.inputElements.toArray();
			if (this.inputElements && inputElementArray.length > 0 && inputElementArray[index - 1]) {
				if (inputElementArray[index].nativeElement.value === "") {
					inputElementArray[index - 1].nativeElement.value = "";
					this.focusElement(inputElementArray[index - 1]);
				}
			}
		}
	}
	private focusElement(element: any): void {
		const inputElementArray = this.inputElements.toArray();
		inputElementArray.forEach((input, i) => {
			this.inputValues[i] = input.nativeElement.value;
		});
		this.finalValues = this.inputValues.join("");
		element.nativeElement.focus();
	}

	public submitOTP() {
		if (this.finalValues && this.finalValues.split("").length === 6) {
			this.getOTP.emit(this.finalValues);
		} else {
			this.toastService.presentToastError("bottom", "One Time Password must be of 6 digits characters");
		}
	}

	private updateTimerDisplay(): void {
		this.minutes = Math.floor(this.timer / 60)
			.toString()
			.padStart(2, "0");
		this.seconds = (this.timer % 60).toString().padStart(2, "0");
	}

	private startTimer(): void {
		this.timerInterval = setInterval(() => {
			this.updateTimerDisplay();

			if (this.timer > 0) {
				this.timer--;
			} else {
				clearInterval(this.timerInterval);
				this.timerExpired = true;
			}
		}, 1000);
	}

	public async resendOTP() {
		const email = await this.storageService.get(APPCONSTANTS.TEMP_EMAIL);
		this.apiService.resendOTP({ email: email }).subscribe({
			next: (response: any) => {
				if (response.status) {
					this.isResendOTP = true;
					this.timerExpired = false;
					this.resetTimer();
					this.startTimer();
					this.toastService.presentToastSuccess("top", response.message);
				} else {
					this.toastService.presentToastError("top", response.message);
				}
			},
		});
	}

	private resetTimer() {
		clearInterval(this.timerInterval);
		this.timer = 300;
		this.minutes = "00";
		this.seconds = "00";
	}
}
