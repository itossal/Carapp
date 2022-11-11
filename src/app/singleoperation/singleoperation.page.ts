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
  selector: 'app-singleoperation',
  templateUrl: './singleoperation.page.html',
  styleUrls: ['./singleoperation.page.scss'],
})
export class SingleoperationPage implements OnInit {
  public dateValue: any;
  currentUserinfo;
  car_id;
  datexp;
  currentCarinfo;
  id_marque ;
name_marque;
id_model;
name_model ;
nserie ;
compteur ;
datemc ;
datemajcpt ;
logo;
  constructor(  public autocompletemarque : AutocompleteMarqueService,
    private router: Router,
    private http: HttpClient, 
    private route : ActivatedRoute,
    private UserServicesPage : UserServicesPage,
    public storage: Storage ) { }

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
                this.logo='https://it-open-sprite.com/carapp/logos/'+ this.currentCarinfo.marque+".png";
          
               
 
 
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
