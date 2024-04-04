import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import * as CryptoJS from "crypto-js";

@Injectable({
	providedIn: "root",
})
export class EncryptDecryptService {
	constructor() {}

	encryptUsingAES() {
		// const encryptedFiles = CryptoJS.AES.encrypt(JSON.stringify(files), process.env.SECRET_KEY).toString();
	}
	descrpUsingAES(data: string) {
		const decrypted = CryptoJS.AES.decrypt(data, environment.SECRET_KEY);
		return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
	}
}
