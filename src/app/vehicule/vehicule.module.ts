import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculePageRoutingModule } from './vehicule-routing.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { VehiculePage } from './vehicule.page';

@NgModule({
  imports: [
    AutoCompleteModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VehiculePageRoutingModule
  ],
  declarations: [VehiculePage]
})
export class VehiculePageModule {}
