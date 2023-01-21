import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddresspopupPageRoutingModule } from './addresspopup-routing.module';

import { AddresspopupPage } from './addresspopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddresspopupPageRoutingModule
  ],
  declarations: [AddresspopupPage]
})
export class AddresspopupPageModule {}
