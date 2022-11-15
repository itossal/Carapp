import { Component, OnInit,NgModule ,Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FacebookLogin,FacebookLoginResponse,FacebookCurrentAccessTokenResponse  } from '@capacitor-community/facebook-login';
import { Router, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Plugins} from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import {StorageServicesPage} from 'src/app/dataServices/storage-services/storage-services.page';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-notif-services',
  templateUrl: './notif-services.page.html',
  styleUrls: ['./notif-services.page.scss'],
})
export class NotifServicesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
