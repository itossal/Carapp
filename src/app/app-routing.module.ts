import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'user-services',
    loadChildren: () => import('./dataServices/user-services/user-services.module').then( m => m.UserServicesPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'storage-services',
    loadChildren: () => import('./dataServices/storage-services/storage-services.module').then( m => m.StorageServicesPageModule)
  },
  {
    path: 'vehicule',
    loadChildren: () => import('./vehicule/vehicule.module').then( m => m.VehiculePageModule)
  },
  {
    path: 'operation',
    loadChildren: () => import('./operation/operation.module').then( m => m.OperationPageModule)
  },
  {
    path: 'mycar/:id',
    loadChildren: () => import('./mycar/mycar.module').then( m => m.MycarPageModule)
  },
  {
    path: 'singleoperation',
    loadChildren: () => import('./singleoperation/singleoperation.module').then( m => m.SingleoperationPageModule)
  },
  {
    path: 'listoperations',
    loadChildren: () => import('./listoperations/listoperations.module').then( m => m.ListoperationsPageModule)
  },
  {
    path: 'sigleoperationdetail/:id',
    loadChildren: () => import('./sigleoperationdetail/sigleoperationdetail.module').then( m => m.SigleoperationdetailPageModule)
  },
  {
    path: 'notif-services',
    loadChildren: () => import('./notif-services/notif-services.module').then( m => m.NotifServicesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
