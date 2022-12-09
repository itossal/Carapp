import { Component, OnInit } from '@angular/core';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(    private toastController: ToastController,private UserServicesPage : UserServicesPage) { }

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
  contact_us:any = {};
  submitcontact(){
let email = this.contact_us['email'];
let object = this.contact_us['object'];
let message = this.contact_us['message'];

    this.UserServicesPage.submitContact(email,object,message).subscribe(async (res) =>{
      console.log(res.resdata);
      if(res.res == 'success' ){
    
        this.presentToast('middle');
       }
       if(res.res == 'error' ){
        this.presentToasterror('middle');
      }
      });
  }

}
