import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./home.page";

const routes: Routes = [
	{
		path: "",
		component: HomePage,
		children: [
			{ path: "", redirectTo: "library", pathMatch: "full" },
			{
				path: "notes-listing",
				loadChildren: () => import("./notes/notes.module").then((m) => m.NotesListingPageModule),
			},
			{
				path: "library",
				loadChildren: () => import("./library/library.module").then((m) => m.LibraryPageModule),
			},
			{
				path: "profession",
				loadChildren: () => import("./profession/profession.module").then((m) => m.ProfessionPageModule),
			},
			{
				path: "profile",
				loadChildren: () => import("./profile/profile.module").then((m) => m.ProfilePageModule),
			},
			
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomePageRoutingModule {}
