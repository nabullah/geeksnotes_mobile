import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesListingPageRoutingModule } from './notes-listing-routing.module';

import { NotesListingPage } from './notes-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesListingPageRoutingModule
  ],
  declarations: [NotesListingPage]
})
export class NotesListingPageModule {}
