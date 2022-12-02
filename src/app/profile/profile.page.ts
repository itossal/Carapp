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

     async ngOnInit() {
      const tabs = document.getElementById("tabs_panel");
     tabs.style.display = 'flex';
  const back_btn_topBar = document.getElementById("back_btn_topBar");
  back_btn_topBar.style.display = 'block';
  const imgavatar = document.getElementById("imgavatar");
  imgavatar.style.display = 'block';  
  

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



     this.user_name = this.currentUserinfo.nom;
     this.user_email = this.currentUserinfo.email;
     this.user_phone = this.currentUserinfo.phone;


       

     this.UserServicesPage.getUserCars(this.currentUserinfo.id).subscribe(async (res) =>{
    this.carlist = res.carlist;
    console.log(this.carlist);
      
          this.carlistcomplete =  Object.values(this.carlist).filter(  
          (item) => { 
            console.log(item);
      this.UserServicesPage.getMarqueModelnames(item['marque'],item['model']).subscribe(async (result) =>{
    
      item['marquename'] = result.marquename;
      item['modelname'] = result.modelname;
      var urlimagecar = 'http://autoapp.it-open-sprite.com/carapp/logos/'+item['marquename'].toLowerCase()+".png";

     this.checkIfImageExists(urlimagecar, (exists) => {
      if (exists) {
        console.log('Image exists. ');
        item['logo'] = 'http://autoapp.it-open-sprite.com/carapp/logos/'+item['marquename'].toLowerCase()+".png";

      } else {
        console.error('Image does not exists.');
        item['logo'] = 'http://autoapp.it-open-sprite.com/carapp/logos/'+item['marquename'].toLowerCase()+".jpg";
      }
    });
    
    
    });
        }
        );

   
       
    });
    this.NotifServicesService.initPush();
/*
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
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );*/
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
  single_user:any = {}
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
      async presentToasterrorpw(position: 'top' | 'middle' | 'bottom') {
        const toast = await this.toastController.create({
          message: 'Confirmer mot de passe',
          duration: 1500,
          position: position
        });
      
        await toast.present();
      }
      profile(){



        let nom = this.single_user['nom'];
        let mail = this.single_user['email'];
        let password = this.single_user['pw'];
        let confirm_password = this.single_user['confirmpw'];
        let phone = this.single_user['phone'];
        console.log(password);
        console.log(confirm_password);
        if (confirm_password == password){
          this.UserServicesPage.updateAccount( this.currentUserinfo.id,mail,nom,password,phone).subscribe(res =>{
   
            if(!res.succes){
              this.presentToast('middle');
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
