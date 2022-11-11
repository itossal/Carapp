import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycarPage } from './mycar.page';

const routes: Routes = [
  {
    path: '',
    component: MycarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycarPageRoutingModule {}
