import { Component, OnInit,NgModule  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FacebookLogin,FacebookLoginResponse,FacebookCurrentAccessTokenResponse  } from '@capacitor-community/facebook-login';
import { Router, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Plugins} from '@capacitor/core';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import {StorageServicesPage} from 'src/app/dataServices/storage-services/storage-services.page';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
@NgModule({

  providers:[Storage],
  })
export class ProfilePage implements OnInit {
  currentUserinfo;
  constructor(   private router: Router,
    private http: HttpClient, 
    private UserServicesPage : UserServicesPage,
    public storage: Storage,
    public StorageServicesPage :StorageServicesPage
     ) { }

     async ngOnInit() {
      await this.storage.create();
    this.currentUserinfo = await   this.getStorageValue('resuserData').then(result => {
  
 return result;
 
 }).catch(e => {
       console.log('error: '+ e);
     }); 


     console.log('resuserData' , this.currentUserinfo);
  }
  single_user:any = {}
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
