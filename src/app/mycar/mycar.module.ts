import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycarPageRoutingModule } from './mycar-routing.module';

import { MycarPage } from './mycar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycarPageRoutingModule
  ],
  declarations: [MycarPage]
})
export class MycarPageModule {}
