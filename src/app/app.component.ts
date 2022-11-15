import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { NotifServicesService } from './services/notif-services.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentUserinfo;
  constructor(private router : Router,public storage: Storage,  private platform: Platform,private NotifServicesService : NotifServicesService) {
    this.initializeApp();
  }


  btnBack(){
    console.log('clicked');
    history.back();
  }
  async initializeApp() {
    await this.storage.create();

    this.platform.ready().then(() => {
     
     // this.NotifServicesService.initPush();
      this.getStorageValue('resuserData').then(result => {
       
        if (result) {
          this.router.navigate(['profile']);
        } else {
          this.router.navigate(['login']);
        }
 }).catch(e => {
       console.log('error: '+ e);
     }); 

    });
  }
  async setStorageValue(key: string, value: any): Promise<any> {
    try {
    const result = await this.storage.set(key, value);
    return true;
    } catch (reason) {
    return false;
    }
  }
  async getStorageValue(key: string): Promise<any> {
    try {
    const result = await this.storage.get(key);
    return result;
    } catch (reason) {
    return false;
    }
  }
}
