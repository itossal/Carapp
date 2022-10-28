import { Component, OnInit, Injectable ,NgModule  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FacebookLogin,FacebookLoginResponse,FacebookCurrentAccessTokenResponse  } from '@capacitor-community/facebook-login';
import { Router, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Plugins} from '@capacitor/core';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import {StorageServicesPage} from 'src/app/dataServices/storage-services/storage-services.page';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {isPlatform} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
@NgModule({

providers:[Storage],
})

export class LoginPage implements OnInit  {
  token :any;
user:any;
  constructor(
 //  private storage: Storage ,
    private router: Router,
    private http: HttpClient, 
    private UserServicesPage : UserServicesPage,
    public storage: Storage  
      ) {  
    
          GoogleAuth.initialize();
      
       
      }

  async ngOnInit() {
 //  await this.storage.create();

  }

 async gLogin(){
      this.user = await GoogleAuth.signIn();
      console.log('user : ',this.user);
 }


 async gRefresh(){
  this.user = await GoogleAuth.refresh();
  console.log('refresh : ',this.user);
}

async gsignOut(){
   await GoogleAuth.signOut();
   this.user = null;
  console.log('signOut : ',this.user);
}
 async  fbLogin (){
    const FACEBOOK_PERMISSIONS = [
      'email',
      'user_birthday',
      'user_photos',
      'user_gender',
    ];

    const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
 console.log('result',result);
 if (result.accessToken) {
  // Login successful.
  console.log(`Facebook access token is ${result.accessToken.token}`);
  this.token = result.accessToken.token;
 // this.loadUserData();
}
  }
  loadUserData(){
   let url = 'http://graph.facebook.com/'+this.token.userId+'?fields=id,name,picture,width(720),birthday,email&access_token='+this.token.token;
   var headers = new HttpHeaders();
   let options = { headers:headers};
   this.http.post(url, {}, options).subscribe(res=>{
      console.log('resp=',res);
      //let final = JSON.parse(res.data);
      //console.log("final = ",final)

    })
  }

  single_login:any = {};
  submitLogin(){
let email = this.single_login['email'];
let password = this.single_login['password'];
    this.UserServicesPage.submitLogin(email,password).subscribe(async (res) =>{
      console.log(res.resdata.id);
      if(res.res == 'success' ){
        this.setStorageValue('aaaaa','bbbbb');
      this.setStorageValue('resuserData',res.resdata);
      console.log(this.setStorageValue('resuserData',JSON.stringify(res.resdata.id)));
     // this.router.navigateByUrl(`/tabs`);
  
       }
       if(res.res == 'error' ){
 
      }
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