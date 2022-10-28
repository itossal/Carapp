import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorageServicesPage } from './storage-services.page';

const routes: Routes = [
  {
    path: '',
    component: StorageServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorageServicesPageRoutingModule {}
