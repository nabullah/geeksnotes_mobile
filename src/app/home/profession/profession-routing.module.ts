import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionPage } from './profession.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessionPageRoutingModule {}
