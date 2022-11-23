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

         
                this.logo='https://autoapp.it-open-sprite.com/carapp/logos/'+ this.currentCarinfo.marque+".png";
          
                this.UserServicesPage.getlistOperationbyId(this.currentUserinfo.id,this.car_id,this.operation_id).subscribe(async (res) =>{
                  
                    this.operationdetail =res.listoperation[0];
                    console.log(' this.operationdetail', this.operationdetail);
              


                    this.datexp = res.listoperation[0].datexp  ;
                    this.compteur  = res.listoperation[0].compteur ;
                 
             
                    this.date_crea = res.listoperation[0].date_crea ;
                    this.kmexp = res.listoperation[0].kmexp ;
                    this.litres = res.listoperation[0].litres ;
                    this.nbjournotif = res.listoperation[0].nbjournotif  ;
                    this.nbkmnotif = res.listoperation[0].nbkmnotif ;
                    this.operation_name = res.listoperation[0].operation_name ;
                    this.done = res.listoperation[0].done ;
                    if ( this.done=="0"){
                      this.opstate = false;
                    }else{
                      this.opstate = true;
                    }
                    this.price = res.listoperation[0].price ;
                    this.type = res.listoperation[0].type ;
                    this.id_marque   =   this.currentCarinfo.marque;
                    this.name_marque =   this.currentCarinfo.marquename;
                    this.id_model     =   this.currentCarinfo.model;
                    this.name_model   =   this.currentCarinfo.modelname;
               console.log(' this.opstate', this.opstate);

                }); 
              
 
              }
  single_operation: any={};
 UpdateOperation(){
    console.log(this.single_operation);
    console.log(this.currentUserinfo);
  let  data = "operation_name="+this.single_operation.operation_name+"&type="+this.single_operation.type+"&compteur="+this.single_operation.compteur+"&price="+this.single_operation.price+"&litres="+this.single_operation.litres+"&datexp="+this.single_operation.datexp+"&nbjournotif="+this.single_operation.nbjournotif+"&kmexp="+this.single_operation.kmexp+"&nbkmnotif="+this.single_operation.nbkmnotif;
    this.UserServicesPage.updateOperation( this.currentUserinfo.id,this.operation_id ,this.car_id ,data ).subscribe(async (res) =>{
      if (res.updated == 'success'){
  
        this.router.navigateByUrl(`/mycar/${this.car_id}`);
      
      }
    });

  }
  changeOperationstate($event){
   console.log($event.detail.checked)

   if ($event.detail.checked){

    this.UserServicesPage.setOperationstate( this.currentUserinfo.id,this.car_id,this.operation_id,1  ).subscribe(async (res) =>{
      if (res.updated == 'success'){
  
        this.router.navigateByUrl(`/mycar/${this.car_id}`);
      
      }
    });
   }else{

    this.UserServicesPage.setOperationstate( this.currentUserinfo.id,this.car_id,this.operation_id,0 ).subscribe(async (res) =>{
      if (res.updated == 'success'){
  
        this.router.navigateByUrl(`/mycar/${this.car_id}`);
      
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
