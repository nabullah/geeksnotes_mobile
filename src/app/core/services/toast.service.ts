import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
	providedIn: "root",
})
export class ToastService {
	constructor(private readonly toastController: ToastController) {}

	async presentToastSuccess(position: "bottom" | "top" | "middle", message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 3000,
			position: position,
			color: "success",
		});

		await toast.present();
	}

	async presentToastError(position: "bottom" | "top" | "middle", message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 3000,
			position: position,
			color: "danger",
		});

		await toast.present();
	}

	async presentToastCustom(color: string, position: "bottom" | "top" | "middle", message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 3000,
			position: position,
			color: color,
		});

		await toast.present();
	}
}
