import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListoperationsPageRoutingModule } from './listoperations-routing.module';

import { ListoperationsPage } from './listoperations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListoperationsPageRoutingModule
  ],
  declarations: [ListoperationsPage]
})
export class ListoperationsPageModule {}
