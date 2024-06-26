import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		redirectTo: "auth",
		pathMatch: "full",
	},
	{
		path: "home",
		loadChildren: () => import("./pages/home/home.module").then((m) => m.HomePageModule),
	},
	{
		path: "auth",
		loadChildren: () => import("./auth/auth.module").then((m) => m.AuthPageModule),
	},
	{
		path: "search",
		loadChildren: () => import("./pages/search/search.module").then((m) => m.SearchPageModule),
	},
	{
		path: "note-detail",
		loadChildren: () => import("./pages/note-details/note-details.module").then((m) => m.NoteDetailsPageModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
