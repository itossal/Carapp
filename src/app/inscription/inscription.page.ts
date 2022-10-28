import { Component, OnInit,OnDestroy, ViewChild, ElementRef, Renderer2   } from '@angular/core';
import { FacebookLogin,FacebookLoginResponse,FacebookCurrentAccessTokenResponse  } from '@capacitor-community/facebook-login';
import { Router, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Plugins} from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  constructor(   private router: Router,
    private http: HttpClient, 
     private UserServicesPage : UserServicesPage,
     private toastController: ToastController,
    ) { }

  ngOnInit() {
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Utilisateur créer avec success',
      duration: 1500,
      position: position
    });
  
    await toast.present();
  }
  async presentToasterror(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Error occured',
      duration: 1500,
      position: position
    });
  
    await toast.present();
  }
  async presentToasterroruserexist(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Email déja utiliser',
      duration: 1500,
      position: position
    });
  
    await toast.present();
  }
  async presentToasterrorpw(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Confirmer mot de passe',
      duration: 1500,
      position: position
    });
  
    await toast.present();
  }
  

  single_user:any = {};
  newprofile(){
let nom = this.single_user['nom'];
let mail = this.single_user['email'];
let password = this.single_user['pw'];
let confirm_password = this.single_user['confirmpw'];
let phone = this.single_user['phone'];
console.log(password);
console.log(confirm_password);
if (confirm_password == password){
  this.UserServicesPage.createAccount(mail,nom,password,phone).subscribe(res =>{
    console.log('data at first',res)
    if(!res.succes){
      this.presentToast('middle');
    }
    if(res.res == 'succes'){
   
      this.router.navigateByUrl(`/tabs`);
    }
    if (res.res == 'error'){
      this.presentToasterror('middle');
    }
    if (res.res == 'user_exist'){
      this.presentToasterroruserexist('middle');
      
    }
  })
}else{
  this.presentToasterrorpw('middle');
}
   

  }


 
}
