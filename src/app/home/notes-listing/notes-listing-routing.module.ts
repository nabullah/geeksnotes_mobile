import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesListingPage } from './notes-listing.page';

const routes: Routes = [
  {
    path: '',
    component: NotesListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesListingPageRoutingModule {}
