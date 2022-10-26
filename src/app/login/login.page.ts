import { Component, OnInit,OnDestroy, ViewChild, ElementRef, Renderer2   } from '@angular/core';
import { FacebookLogin,FacebookLoginResponse,FacebookCurrentAccessTokenResponse  } from '@capacitor-community/facebook-login';
import { Router, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Plugins} from '@capacitor/core';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit  {
  token :any;

  constructor(
    private router: Router,
    private http: HttpClient, 
     private UserServicesPage : UserServicesPage
      ) { }

  ngOnInit() {
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
      if(res.success ){
  
       }
      });
  }

}