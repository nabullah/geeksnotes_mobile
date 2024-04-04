// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = "http://localhost:8000";
// const baseUrl = 'https://geeksnotes-backend.onrender.com';

export const environment = {
	production: false,
	API_URL: baseUrl + "/api",
	SECRET_KEY: "sdfsdvsd2345tfvzds34t3_asfs fsadf@^&SDFSDF34567&*(*)$%sdfg852sfdd1dsg65132doluikjhg32",
	baseUrl: baseUrl,

	firebaseConfig: {
		apiKey: "AIzaSyDKnFWgk9LTFtIS9k1itet0napkpNjG2fQ",
		authDomain: "geeks-notes.firebaseapp.com",
		projectId: "geeks-notes",
		storageBucket: "geeks-notes.appspot.com",
		messagingSenderId: "666911746801",
		appId: "1:666911746801:web:7870cf1d851822e7c79750",
		measurementId: "G-0XGFE0F9HD",
		vapidKey: "BKAZQVGtQ9GJP0FVq3T_xhNElN3LDNBBoa4tFsCLcpnhMWpqMu8cKHSDuk2zjERDw8gT3CGO8RQLdcvmBOewSdo",
	},
	GOOGLE_CLIENT_ID: "263975702648-v1gdn0e6d1f1if9bu35dipn9em2t2tg2.apps.googleusercontent.com",
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
