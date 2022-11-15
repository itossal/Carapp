import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifServicesPageRoutingModule } from './notif-services-routing.module';

import { NotifServicesPage } from './notif-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifServicesPageRoutingModule
  ],
  declarations: [NotifServicesPage]
})
export class NotifServicesPageModule {}
