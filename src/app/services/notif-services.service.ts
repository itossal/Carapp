import { Component, OnInit,NgModule ,Injectable } from '@angular/core';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import { Storage } from '@ionic/storage';
import {

  Capacitor
} from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
  
} from '@capacitor/push-notifications';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotifServicesService {
  currentUserinfo ;
  constructor(private router: Router, private UserServicesPage : UserServicesPage,public storage: Storage) { }

 async initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
    this.currentUserinfo = await this.getStorageValue('resuserData').then(result => {
    
      return result;
      
      }).catch(e => {
            console.log('error: '+ e);
          }); 
  }

  private registerPush() {
  
    console.log('Initializing HomePage');
 
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);


        this.UserServicesPage.setUserToken( this.currentUserinfo.id ,token.value ).subscribe(async (res) =>{
          if (res.inserted == 'success'){
      
          
          
          }
        });


      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
        this.router.navigateByUrl(`/profile/`);
      }
    );
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
