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
  tab_userinfo :any;
  constructor(

    private router: Router,
    private http: HttpClient, 
    private UserServicesPage : UserServicesPage,
    public storage: Storage  
      ) {  
        GoogleAuth.initialize();
      
      }

  async ngOnInit() {
  await this.storage.create();
  
  const tabs = document.getElementById("tabs_panel");
  tabs.style.display = 'none';
  const back_btn_topBar = document.getElementById("back_btn_topBar");
  back_btn_topBar.style.display = 'none';   
  const imgavatar = document.getElementById("imgavatar");
  //imgavatar.style.display = 'none';   
  }

 async gLogin(){
      this.user = await GoogleAuth.signIn();
 console.log( this.user);
 var name_user = "";
 if (this.user.hasOwnProperty('name') ){
  name_user = this.user.name;
 }else if(this.user.hasOwnProperty('givenName')){
  name_user = this.user.givenName;
 }else{
  name_user = this.user.familyName;
 } 
 
//this.tab_userinfo.email = this.user.email;
//this.tab_userinfo.nom = name_user;

 this.setStorageValue('userimgUrl',this.user.imageUrl);
      this.UserServicesPage.getuserLogindata(this.user.email,name_user).subscribe(async (res) =>{
        if(res.res == 'success' ){
          console.log('res.res',res.resdata)
          this.setStorageValue('resuserData',res.resdata);
          this.router.navigateByUrl(`/profile`);
          setTimeout(()=>{
            window.location.reload()
          },500);
        }
      });

 }


 async gRefresh(){
  this.user = await GoogleAuth.refresh();
  console.log('refresh : ',this.user);
}

async gsignOut(){
  
  this.storage.clear();
   await GoogleAuth.signOut();
   this.user = null;
  console.log('signOut : ',this.user);
}
 async  fbLogin (){
    const FACEBOOK_PERMISSIONS = [
      'email',
      'public_profile',
      'user_photos',
      'user_gender',
    ];

    const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
 console.log('result',result);
 if (result.accessToken && result.accessToken.userId) {
  this.token = result.accessToken;
  this.loadUserData();
} else if (result.accessToken && !result.accessToken.userId) {
  // Web only gets the token but not the user ID
  // Directly call get token to retrieve it now
  this.getCurrentToken();
} else {
  // Login failed
}
  }
   async getCurrentToken() {
    const result = await FacebookLogin.getCurrentAccessToken();

    if (result.accessToken) {
      this.token = result.accessToken;
      this.loadUserData();
    } else {
      // Not logged in.
    }
  }
  loadUserData(){
   let url = 'http://graph.facebook.com/'+this.token.userId+'?fields=id,name,picture.width(720),email&access_token='+this.token.token;
   var headers = new HttpHeaders();
   let options = { headers:headers};
   this.http.post(url, {}, options).subscribe(res=>{
      console.log('resp=',res);
      this.user = res;
      this.setStorageValue('userimgUrl',this.user.picture.data.url);
      //let final = JSON.parse(res.data);
      //console.log("final = ",final)

    })
  }

  single_login:any = {};
submitLogin(){
let email = this.single_login['email'];
let password = this.single_login['password'];
    this.UserServicesPage.submitLogin(email,password).subscribe(async (res) =>{
      console.log(res.resdata);
      if(res.res == 'success' ){
      this.setStorageValue('resuserData',res.resdata);
      this.router.navigateByUrl(`/profile`);
      setTimeout(()=>{
        window.location.reload()
      },500);
      
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