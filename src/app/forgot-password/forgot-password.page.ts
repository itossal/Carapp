import { Component, OnInit } from '@angular/core';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private toastController: ToastController,private UserServicesPage : UserServicesPage,) { }

  ngOnInit() {
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Message envoyer avec success',
      duration: 1500,
      position: position
    });
  
    await toast.present();
  }
  async presentToasterror(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Message non envoyer',
      duration: 1500,
      position: position
    });
  
    await toast.present();
  }
  async presentToasterroremail(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Confirmer Email',
      duration: 1500,
      position: position
    });
  
    await toast.present();
  }
  fpw:any = {};
  submitfpw(){
    let email = this.fpw['email'];
  
    if (this.fpw['email'] == this.fpw['emailconfirm']){

      this.UserServicesPage.submitFpw(email).subscribe(async (res) =>{
        console.log(res.resdata);
        if(res.res == 'success' ){
      
          this.presentToast('middle');
         }
         if(res.res == 'error' ){
          this.presentToasterror('middle');
        }
        });
    }else{
      this.presentToasterroremail('middle');
      
    }
   
      }





}
