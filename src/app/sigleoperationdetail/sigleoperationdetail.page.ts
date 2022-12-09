import { Component, OnInit, Injectable ,NgModule  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup, FormControl} from '@angular/forms';
//import {Plugins} from '@capacitor/core';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import {StorageServicesPage} from 'src/app/dataServices/storage-services/storage-services.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import {map} from 'rxjs/operators';
import { AutocompleteMarqueService } from '../services/autocomplete.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-sigleoperationdetail',
  templateUrl: './sigleoperationdetail.page.html',
  styleUrls: ['./sigleoperationdetail.page.scss'],
})
export class SigleoperationdetailPage implements OnInit {
  public dateValue: any;
  currentUserinfo;
  car_id;
  datexp;
  currentCarinfo;

  operationdetail
  id_marque  ;
  name_marque;
  id_model   ;
  name_model ;
compteur ;
datemc ;
logo;
date_crea;
kmexp;
litres;
nbjournotif;
nbkmnotif;
operation_name;
done;
price;
type;
opstate;
whitespace;
nserie;
datemajcpt;
  constructor(  public autocompletemarque : AutocompleteMarqueService,
    private router: Router,
    private http: HttpClient, 
    private route : ActivatedRoute,
    private UserServicesPage : UserServicesPage,
    public storage: Storage ) { }
    operation_id = this.route.snapshot.paramMap.get('id');
    async ngOnInit() {
  
      await this.storage.create();
      let now = new Date();
      this.dateValue =   now.toLocaleDateString();
      this.currentUserinfo = await this.getStorageValue('resuserData').then(result => {
      
        return result;
        
        }).catch(e => {
              console.log('error: '+ e);
            }); 
      this.car_id = await this.getStorageValue('car_id').then(result => {
        console.log(result);
        return result;
      
        }).catch(e => {
              console.log('error: '+ e);
            }); 
  
            this.currentCarinfo= await this.getStorageValue('currentCarinfo').then(result => {
       
              return result;
            
              }).catch(e => {
                    console.log('error: '+ e);
                  }); 
  
              
  
                  this.id_marque =   this.currentCarinfo.marque;
                  this.name_marque =   this.currentCarinfo.marquename;
                  this.id_model =   this.currentCarinfo.model;
                  this.name_model =   this.currentCarinfo.modelname;
                  this.nserie =  this.currentCarinfo.nserie;
                  this.compteur =  this.currentCarinfo.compteur;
                  this.datemc =  this.currentCarinfo.datemc;
                  this.datemajcpt =  this.currentCarinfo.date_maj_cmpt;
  
                  var re = / /gi; 
                  var str = this.currentCarinfo.marquename;
                  var newstr = str.replace(re, "-");
  
                  this.whitespace = " ";
                      var urlimagecar = 'http://autoapp.it-open-sprite.com/carapp/logos/'+newstr.toLowerCase()+".png";
  
                      this.checkIfImageExists(urlimagecar, (exists) => {
                       if (exists) {
                         console.log('Image exists. ');
                         this.logo= 'http://autoapp.it-open-sprite.com/carapp/logos/'+newstr.toLowerCase()+".png";
                 
                       } else {
                         console.error('Image does not exists.');
                         this.logo = 'http://autoapp.it-open-sprite.com/carapp/logos/'+newstr.toLowerCase()+".jpg";
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
    single_operation: any={};
    newOperation(){
      console.log(this.single_operation);
      console.log(this.currentUserinfo);
    let  data = "operation_name="+this.single_operation.operation_name+"&type="+this.single_operation.type+"&compteur="+this.single_operation.compteur+"&price="+this.single_operation.price+"&litres="+this.single_operation.litres+"&datexp="+this.single_operation.datexp+"&nbjournotif="+this.single_operation.nbjournotif+"&kmexp="+this.single_operation.kmexp+"&nbkmnotif="+this.single_operation.nbkmnotif;
      this.UserServicesPage.addnewOperation( this.currentUserinfo.id ,this.car_id ,data ).subscribe(async (res) =>{
        if (res.inserted == 'success'){
    
          this.router.navigateByUrl(`/mycar/${this.car_id}`);
        
        }
      });
  
    }
  
  changeOperationstate($event){
   console.log($event.detail.checked)

   if ($event.detail.checked){

    this.UserServicesPage.setOperationstate( this.currentUserinfo.id,this.car_id,this.operation_id,1  ).subscribe(async (res) =>{
      if (res.updated == 'success'){
  
       // this.router.navigateByUrl(`/mycar/${this.car_id}`);
      
      }
    });
   }else{

    this.UserServicesPage.setOperationstate( this.currentUserinfo.id,this.car_id,this.operation_id,0 ).subscribe(async (res) =>{
      if (res.updated == 'success'){
  
      //  this.router.navigateByUrl(`/mycar/${this.car_id}`);
      
      }
    });

   }
  }
  
  set date(value: any) {
   
    this.datemc = value;
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
