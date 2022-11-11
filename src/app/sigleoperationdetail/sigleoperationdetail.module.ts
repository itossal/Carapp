import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigleoperationdetailPageRoutingModule } from './sigleoperationdetail-routing.module';

import { SigleoperationdetailPage } from './sigleoperationdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigleoperationdetailPageRoutingModule
  ],
  declarations: [SigleoperationdetailPage]
})
export class SigleoperationdetailPageModule {}
