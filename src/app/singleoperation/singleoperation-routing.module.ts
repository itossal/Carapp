import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleoperationPage } from './singleoperation.page';

const routes: Routes = [
  {
    path: '',
    component: SingleoperationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleoperationPageRoutingModule {}
