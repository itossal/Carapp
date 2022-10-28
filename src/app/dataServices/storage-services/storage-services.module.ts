import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorageServicesPageRoutingModule } from './storage-services-routing.module';

import { StorageServicesPage } from './storage-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorageServicesPageRoutingModule
  ],
  declarations: [StorageServicesPage]
})
export class StorageServicesPageModule {}
