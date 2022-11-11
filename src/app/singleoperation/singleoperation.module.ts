import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleoperationPageRoutingModule } from './singleoperation-routing.module';

import { SingleoperationPage } from './singleoperation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleoperationPageRoutingModule
  ],
  declarations: [SingleoperationPage]
})
export class SingleoperationPageModule {}
