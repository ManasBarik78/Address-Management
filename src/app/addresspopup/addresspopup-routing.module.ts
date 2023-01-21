import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddresspopupPage } from './addresspopup.page';

const routes: Routes = [
  {
    path: '',
    component: AddresspopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddresspopupPageRoutingModule {}
