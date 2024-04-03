import { Component, EventEmitter, OnInit, Output, Renderer2 } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { APPCONSTANTS } from "../../constants/app.constants";
import { SignalService } from "../../services/signal.service";

@Component({
	selector: "app-one-time-password",
	templateUrl: "./one-time-password.component.html",
	styleUrls: ["./one-time-password.component.scss"],
})
export class OneTimePasswordComponent implements OnInit {
	@Output() getOTP: EventEmitter<string> = new EventEmitter<string>();

	public readonly inputs: string[] = ["input1", "input2", "input3", "input4", "input5", "input6"];
	private readonly currentInputIndex: number = 0;
	public inputValues: string[] = ["", "", "", "", "", ""];
	private finalValues!: string;
	public isResendOTP: boolean = false;

	public timer: number = 300;
	public minutes: string = "00";
	public seconds: string = "00";
	public timerExpired: boolean = false;
	public timerInterval: any;

	constructor(private readonly renderer: Renderer2, private readonly apiService: ApiService, private readonly signalService: SignalService) {}

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
		const inputElements = document.querySelectorAll("input");
		this.inputValues[index] = inputElements[index].value;
		if (inputElements[index] && inputElements[index].value !== "") {
			this.focusElement(inputElements[index + 1]);
		} else if (inputElements[index] && inputElements[index].value === "") {
			this.focusElement(inputElements[index - 1]);
		}
	}

	private focusElement(element: HTMLElement): void {
		this.finalValues = this.inputValues.join("");
		if (element) {
			this.renderer.selectRootElement(element).focus();
		}
	}

	public submitOTP() {
		if (this.finalValues && this.finalValues.split("").length === 6) {
			this.getOTP.emit(this.finalValues);
		} else {
			// this.sweetAlertService.sendNotification("error", "One Time Password must be of 6 digits characters");
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
				// alert('Timer expired!');
				this.timerExpired = true;
			}
		}, 1000);
	}

	public resendOTP() {
		this.apiService.resendOTP({ email: <string>"" }).subscribe({
			next: (response: any) => {
				if (response.status) {
					this.isResendOTP = true;
					this.timerExpired = false;
					this.resetTimer();
					this.startTimer();
					// this.sweetAlertService.sendNotification("success", response.message);
				} else {
					// this.sweetAlertService.sendNotification("error", response.message);
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
