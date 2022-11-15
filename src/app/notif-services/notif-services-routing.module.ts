import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifServicesPage } from './notif-services.page';

const routes: Routes = [
  {
    path: '',
    component: NotifServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifServicesPageRoutingModule {}
