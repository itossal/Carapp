import { Component, OnInit,NgModule  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FacebookLogin,FacebookLoginResponse,FacebookCurrentAccessTokenResponse  } from '@capacitor-community/facebook-login';
import { Router, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Plugins} from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import {StorageServicesPage} from 'src/app/dataServices/storage-services/storage-services.page';
import { NotifServicesService } from '../services/notif-services.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';




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
  user_name;
  user_email;
  user_phone;
  user_confirmpw;
  user_pw;
  carlist;
  userimgUrl;
  carlistcomplete : any ={}
  constructor(   private router: Router,
    private http: HttpClient, 
    private UserServicesPage : UserServicesPage,
    public storage: Storage,
    public StorageServicesPage :StorageServicesPage,
    private toastController: ToastController,
    private NotifServicesService : NotifServicesService
     ) { }
     async ngOnChanges(){
      this.currentUserinfo = await this.getStorageValue('resuserData').then(result => {
        console.log('resuserData result' , result);
         return result;
         }).catch(e => {
               console.log('error: '+ e);
          });
     }
     async ngOnInit() {
      const tabs = document.getElementById("tabs_panel");
     tabs.style.display = 'flex';
  const back_btn_topBar = document.getElementById("back_btn_topBar");
  back_btn_topBar.style.display = 'block';
  const imgavatar = document.getElementById("imgavatar");
  

      await this.storage.create();
    this.currentUserinfo = await this.getStorageValue('resuserData').then(result => {
      console.log('resuserData result' , result);
       return result;
       }).catch(e => {
             console.log('error: '+ e);
        }); 
        this.userimgUrl =  this.getStorageValue('userimgUrl').then(result => {
        console.log('userimgUrl result' , result);
        return result;
      }).catch(e => {
     console.log('error: '+ e);
   }); 

  
   console.log(' this.currentUserinfo  ',  this.currentUserinfo );
     this.user_name = this.currentUserinfo.nom;
     this.user_email = this.currentUserinfo.email;
     this.user_phone = this.currentUserinfo.phone;


       

     this.UserServicesPage.getUserCars(this.currentUserinfo.id).subscribe(async (res) =>{

      if (res.carlist[0] !=null  ){

    this.carlist = res.carlist;
    console.log(this.carlist);
      
          this.carlistcomplete =  Object.values(this.carlist).filter(  
          (item) => { 
            console.log(item);
      this.UserServicesPage.getMarqueModelnames(item['marque'],item['model']).subscribe(async (result) =>{
    
      item['marquename'] = result.marquename;
      item['modelname'] = result.modelname;

      var re = / /gi; 
      var str = item['marquename'];
      var newstr = str.replace(re, "-");


      var urlimagecar = 'http://autoapp.it-open-sprite.com/carapp/logos/'+newstr.toLowerCase()+".png";

     this.checkIfImageExists(urlimagecar, (exists) => {
      if (exists) {
        console.log('Image exists. ');
        item['logo'] = 'http://autoapp.it-open-sprite.com/carapp/logos/'+newstr.toLowerCase()+".png";

      } else {
        console.error('Image does not exists.');
        item['logo'] = 'http://autoapp.it-open-sprite.com/carapp/logos/'+newstr.toLowerCase()+".jpg";
      }
    });
    
    
    });
        }
        );

      }
       
    });
    this.NotifServicesService.initPush();

  }
async ionViewDidEnter(){
  await this.storage.create();
  this.currentUserinfo = await this.getStorageValue('resuserData').then(result => {
    console.log('resuserData result' , result);
     return result;
     }).catch(e => {
           console.log('error: '+ e);
      }); 
      this.userimgUrl =  this.getStorageValue('userimgUrl').then(result => {
      console.log('userimgUrl result' , result);
      return result;
    }).catch(e => {
   console.log('error: '+ e);
 }); 


 console.log(' this.currentUserinfo  ',  this.currentUserinfo );
   this.user_name = this.currentUserinfo.nom;
   this.user_email = this.currentUserinfo.email;
   this.user_phone = this.currentUserinfo.phone;


     

   this.UserServicesPage.getUserCars(this.currentUserinfo.id).subscribe(async (res) =>{

    if (res.carlist[0] !=null  ){

  this.carlist = res.carlist;
  console.log(this.carlist);
    
        this.carlistcomplete =  Object.values(this.carlist).filter(  
        (item) => { 
          console.log(item);
    this.UserServicesPage.getMarqueModelnames(item['marque'],item['model']).subscribe(async (result) =>{
  
    item['marquename'] = result.marquename;
    item['modelname'] = result.modelname;

    var re = / /gi; 
    var str = item['marquename'];
    var newstr = str.replace(re, "-");


    var urlimagecar = 'http://autoapp.it-open-sprite.com/carapp/logos/'+newstr.toLowerCase()+".png";

   this.checkIfImageExists(urlimagecar, (exists) => {
    if (exists) {
      console.log('Image exists. ');
      item['logo'] = 'http://autoapp.it-open-sprite.com/carapp/logos/'+newstr.toLowerCase()+".png";

    } else {
      console.error('Image does not exists.');
      item['logo'] = 'http://autoapp.it-open-sprite.com/carapp/logos/'+newstr.toLowerCase()+".jpg";
    }
  });
  
  
  });
      }
      );

    }
     
  });
}

  checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      
      img.onerror = () => {
        callback(false);
      };
    }
  }
  single_user:any = {};
      addCar(){
        this.router.navigateByUrl(`/vehicule`);
      }
      renderCar(id){
        this.router.navigateByUrl(`/mycar/${id}`);
      }
      async presentToast(position: 'top' | 'middle' | 'bottom') {
        const toast = await this.toastController.create({
          message: 'Utilisateur modifié avec success',
          duration: 1500,
          position: position
        });
        await toast.present();
      }

      async presentToastPassOrSomething(position: 'top' | 'middle' | 'bottom') {
        const toast = await this.toastController.create({
          message: 'Saisir votre mot de passe est la confirmation SVP!',
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
      profile(){
        let nom = this.user_name;
        let mail = this.user_email;
        let password = this.user_confirmpw;
        let confirm_password = this.user_pw;
        let phone = this.user_phone;
        console.log(nom);
        console.log(confirm_password);
        if(password == undefined){
          this.presentToastPassOrSomething('middle');
          return;
        }
        if (confirm_password == password){
          this.UserServicesPage.updateAccount( this.currentUserinfo.id,mail,nom,password,phone).subscribe(res =>{
            console.log(res);
            if(!res.succes){
              console.log(res);
              this.presentToast('middle');

              this.UserServicesPage.getuserLogindata(mail,nom).subscribe(async (res) =>{
                if(res.res == 'success' ){
               
                  this.setStorageValue('resuserData',res.resdata);
              this.ngOnChanges();
                }
              });
        
            }
           
          })
        }else{
          this.presentToasterrorpw('middle');
        }
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
