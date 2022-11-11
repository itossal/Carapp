import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigleoperationdetailPage } from './sigleoperationdetail.page';

const routes: Routes = [
  {
    path: '',
    component: SigleoperationdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigleoperationdetailPageRoutingModule {}
