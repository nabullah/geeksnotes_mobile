import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessionPageRoutingModule } from './profession-routing.module';

import { ProfessionPage } from './profession.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessionPageRoutingModule
  ],
  declarations: [ProfessionPage]
})
export class ProfessionPageModule {}
