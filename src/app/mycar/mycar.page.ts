import { Component, OnInit, Injectable ,NgModule  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';

import { AutocompleteMarqueService } from '../services/autocomplete.service';



@Component({
  selector: 'app-mycar',
  templateUrl: './mycar.page.html',
  styleUrls: ['./mycar.page.scss'],
})
export class MycarPage implements OnInit {
  resuserCarsdetailed;
  listoperationall;
  listoperationalleveything;
  listoperationlenght;
  listmarques;
  selectedmark;
  selectedmodel;
  public labelAttribute:string;
  public objects:any[];
  public marqueitems: any[];
  public modelitems: any[];
  id_marque;
  name_marque;
  id_model;
  name_model;
  currentUserinfo;
  currentCarinfo;
 nserie ;
compteur;
datemc ;
datemajcpt;
nbr_jour_notif_compteur;
class_btn;
public dateValue: any;
  
    constructor(
  public autocompletemarque : AutocompleteMarqueService,
      private router: Router,
      private http: HttpClient, 
      private route : ActivatedRoute,
      private UserServicesPage : UserServicesPage,
      private toastController: ToastController,
      public storage: Storage  
    ) {    const objects = [] }
    car_id = this.route.snapshot.paramMap.get('id');
    async presentToast(position: 'top' | 'middle' | 'bottom') {
      const toast = await this.toastController.create({
        message: 'Vehicule modifier!!',
        duration: 1500,
        position: position
      });
      await toast.present();
    }

    async presentToasterror(position: 'top' | 'middle' | 'bottom') {
      const toast = await this.toastController.create({
        message: 'Erreur lors de requette',
        duration: 1500,
        position: position
      });
      await toast.present();
    }

   async ngOnInit() {
  console.log('car_id',this.car_id);
  
  this.setStorageValue('car_id',this.car_id);
  
      await this.storage.create();
      this.currentUserinfo = await this.getStorageValue('resuserData').then(result => {
    
   return result;
   
   }).catch(e => {
         console.log('error: '+ e);
       }); 
       console.log('resuserData' , this.currentUserinfo);

  
   
    if (!this.onlineOffline){
      console.log("no internet");


      this.resuserCarsdetailed = await   this.getStorageValue('resuserCarsdetailed').then(result => {
        console.log('resuserCarsdetailed',result)
       return result;
   
         }).catch(e => {
               console.log('error: '+ e);
          });

            Object.values( this.resuserCarsdetailed).filter(  

            (item) => { 
              console.log(item);
              if (item['id'] == this.car_id ){

                this.id_marque =  item['marque'];
                this.name_marque =  item['marquename'];
                this.id_model =  item['model'];
                this.name_model =  item['modelname'];
                this.nserie = item['nserie'];
                this.compteur = item['compteur'];
                this.nbr_jour_notif_compteur = item['nbr_jour_notif_compteur'];
                this.datemc = item['datemc'];
                this.datemajcpt = item['date_maj_cmpt'];
                const now = new Date();
                var  time = this.getDayDiff(new Date(this.datemajcpt), new Date());
            
                    if (time < 15){
                    this.class_btn = 'btn_compteur';
                    }else{
                      this.class_btn = 'btn_compteurnotif';
                    }

                    this.setStorageValue('currentCarinfo', item);

              }
      
    
          }
          );





    }else{

      this.UserServicesPage.getCarsMarks().subscribe(async (res) =>{
        //  console.log(res);
          this.listmarques =res;
        
    
      });
  
   
     this.UserServicesPage.getUserCarByid(this.currentUserinfo.id,this.car_id).subscribe(async (res) =>{
     
    // console.log(res);
     this.UserServicesPage.getMarqueModelnames(res.car['marque'],res.car['model']).subscribe(async (result) =>{
      
      res.car['marquename'] = result.marquename;
      res.car['modelname'] = result.modelname;
      this.currentCarinfo = res.car;
      this.id_marque =  res.car.marque;
      this.name_marque =  res.car.marquename;
      this.id_model =  res.car.model;
      this.name_model =  res.car.modelname;
      this.nserie = res.car.nserie;
      this.compteur = res.car.compteur;
      this.nbr_jour_notif_compteur = res.car.nbr_jour_notif_compteur;
      this.datemc = res.car.datemc;
      this.datemajcpt = res.car.date_maj_cmpt;
   
      const now = new Date();
    var  time = this.getDayDiff(new Date(this.datemajcpt), new Date());

        if (time < 15){
        this.class_btn = 'btn_compteur';
        }else{
          this.class_btn = 'btn_compteurnotif';
        }

      this.setStorageValue('currentCarinfo', this.currentCarinfo);
     // console.log("this.name_marque",res.car.marquename);
        });
 
    });
  }
    
   
    }
    public onlineOffline: boolean = navigator.onLine;
     getDayDiff(startDate: Date, endDate: Date): number {
      const msInDay = 24 * 60 * 60 * 1000;
    
      return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
    }
    async ionViewDidEnter(){
      this.currentUserinfo = await this.getStorageValue('resuserData').then(result => {
  
        return result;
        
        }).catch(e => {
              console.log('error: '+ e);
            }); 
    
            this.car_id = await this.getStorageValue('car_id').then(result => {
             // console.log("car_idlistop",result);
              return result;
            
              }).catch(e => {
                    console.log('error: '+ e);
                  }); 

                  if (!this.onlineOffline){
                    console.log("no internet");
                    var xtab = [];
                    this.setStorageValue('listoperationall','');
                    this.listoperationalleveything =await   this.getStorageValue('listoperationalleveything').then(result => {
                     console.log('listoperationalleveything',result)
                      return result;
                  
                        }).catch(e => {
                              console.log('error: '+ e);
                         });

                         if (Array.isArray(this.listoperationalleveything)){
                 
                          Object.values(this.listoperationalleveything).filter(  
                            (item) => { 
                              if (item['id_car'] == this.car_id ){
                            //  console.log(item);

                              if (item['type'] =='1'){
                                item['typename'] = 'Entretient'
                               }
                               if (item['type'] =='2'){
                                item['typename'] = 'Carburant'
                               }
                               if (item['type'] =='3'){
                                item['typename'] = 'Tax'
                               }
                             
                               xtab.push(item); 
                               xtab = xtab.slice(0,5);

                               this.setStorageValue('listoperationall',xtab);
                               this.listoperationall =    xtab;
                              }
                          } 
                          );
                        }
                   
                  }else{
                    var tab = await   this.UserServicesPage.getlistOperationnotif( this.currentUserinfo.id ,this.car_id).subscribe(async (res) =>{
                     
                      if (Array.isArray(res.listoperation)){
                        res.listoperation = res.listoperation.slice(0,5);  
                        this.listoperationall = res.listoperation;
                     
                        
                        Object.values(this.listoperationall).filter(  
                          (item) => { 
                       //     console.log(item);
                            if (item['type'] =='1'){
                              item['typename'] = 'Entretient'
                             }
                             if (item['type'] =='2'){
                              item['typename'] = 'Carburant'
                             }
                             if (item['type'] =='3'){
                              item['typename'] = 'Tax'
                             }


                            
                        } 
                     


                        );
                      }
                    
                    });


             

                  }



             
                 
              
    }
  
  
     
      
   
      async inputChanged($event:any ={}) {
    
      const value = $event.target.value;
      
     console.log(value);
      if (value.length <= 0) {
      
      this.marqueitems = [];
      this.selectedmark = [];
      return; 
      }
    
      
  
      (Object.keys(this.listmarques) as (keyof typeof this.listmarques)[]).forEach((key, index) => {
  
       
    
  
  
      const list =  this.listmarques[key] ;
    //console.log('list',list);
    let something : any ={}
    something = list;
    let items : any ={}
       items =  Object.values(something).filter(
        
        (item) => { 
          let singleitem : any ={}
          singleitem = item;
       //   console.log('item',singleitem.name)
  
        return  singleitem.name.toLocaleLowerCase(). includes (value.toLocaleLowerCase())}
      );
      this.selectedmark = items;
     
    });
      
     
      }
     selected (item) {
    //  console.log(item);
      this.id_marque =item.id;
      this.name_marque =item.name;
     
      this.UserServicesPage.getCarsModels(this.id_marque).subscribe(async (res) =>{
       // console.log(this.id_marque);
       // console.log(res);
        this.modelitems =res; 
        const list =  this.modelitems ;
        //console.log('list',list);
        let something : any ={}
        something = list;
        let items : any ={}
           items =  Object.values(something.modellist).filter(  
            (item) => { 
              let singleitem : any ={}
              singleitem = item;
              console.log('item',singleitem)
      
           return  singleitem.name.toLocaleLowerCase(). includes (singleitem.name.toLocaleLowerCase())
          }
          );
          this.selectedmodel = items;
  
    });
      this.marqueitems = [];
      this.selectedmark= [];
  }
  
  
  
  
  
  
  async inputmodelChanged($event:any ={}) {
    const value = $event.target.value;
      
    console.log(value);
     if (value.length <= 0) {
     
      this.selectedmodel =[];
      this.modelitems=[];
     return; 
     }
  if (this.id_marque>0){
    var tab = await   this.UserServicesPage.getCarsModels(this.id_marque).subscribe(async (res) =>{
      console.log(this.id_marque);
      console.log(res);
      this.modelitems =res; 
      const list =  this.modelitems ;
      //console.log('list',list);
      let something : any ={}
      something = list;
      let items : any ={}
         items =  Object.values(something.modellist).filter(  
          (item) => { 
            let singleitem : any ={}
            singleitem = item;
            console.log('item',singleitem)
    
         return  singleitem.name.toLocaleLowerCase(). includes (singleitem.name.toLocaleLowerCase())
        }
        );
        this.selectedmodel = items;
  
  });
  }else{
    var tab = await   this.UserServicesPage.getCarsModelsall().subscribe(async (res) =>{
      console.log(this.id_marque);
      console.log(res);
      this.modelitems =res; 
      const list =  this.modelitems ;
      //console.log('list',list);
      let something : any ={}
      something = list;
      let items : any ={}
         items =  Object.values(something.modellist).filter(  
          (item) => { 
            let singleitem : any ={}
            singleitem = item;
            console.log('item',singleitem)
    
         return  singleitem.name.toLocaleLowerCase(). includes (singleitem.name.toLocaleLowerCase())
        }
        );
        this.selectedmodel = items;
  
  });
  }
  
   
  }
  
  
  
  fselectedmodel(itemmodel){
    this.id_model =itemmodel.id;
    this.name_model =itemmodel.name;
    this.marqueitems = [];
    this.selectedmark= [];
    this.selectedmodel =[];
    this.modelitems=[];
  }
  single_car : any={};
  newVehicule(){

  
  let data="&id_user=2&id_marque="+this.id_marque+"&id_model="+this.id_model+"&nserie="+this.single_car['nserie']+"&compteur="+this.single_car['compteur']+"&nbr_jour_notif_compteur="+this.single_car['nbr_jour_notif_compteur']+"&datemc="+this.single_car['datemc'];
  this.UserServicesPage.addnewCar(data).subscribe(async (res) =>{
  
  console.log(res);
    
  });
  
  }

  updateVehicule(){
    console.log("id_marque",this.id_marque);
    console.log("id_model",this.id_model);
    console.log(this.single_car);
  
  let data="&id_user="+this.currentUserinfo.id+"&id_marque="+this.id_marque+"&id_model="+this.id_model+"&nserie="+this.single_car['nserie']+"&compteur="+this.single_car['compteur']+"&nbr_jour_notif_compteur="+this.single_car['nbr_jour_notif_compteur']+"&datemc="+this.single_car['datemc'];
  this.UserServicesPage.updateCar(this.car_id,data).subscribe(async (res) =>{
  
  console.log(res);
  if(res.updatedvh == 'success'){
    console.log(res);
    this.presentToast('middle');
  }else{
    this.presentToasterror('middle');
  }
    
  });
  
  }
  
async  compteurChanged(){
    const input = document.getElementById('compteur') as HTMLInputElement | null;

    let valuecptr = input?.value;


    var tab = await   this.UserServicesPage.changeCarcompteur(this.currentUserinfo.id,this.car_id,valuecptr).subscribe(async (res) =>{
  
      console.log(res);
      if(res.compteurupdated == "success"){
       this.datemajcpt =  res.date_maj_cmpt;
       this.ngOnInit();
      }
        
      });
   
  }

  inputnbrjrChanged($event:any ={}) {
    let value = $event.target.value;
    console.log(value);
      if (value >= 15){  
        this.nbr_jour_notif_compteur = 15;

        this.ngOnInit();
      }
  }
  Addoperation(){
    this.router.navigateByUrl(`/singleoperation`);
  }
  renderOperation(id){
    console.log(id);
        this.router.navigateByUrl(`/sigleoperationdetail/${id}`);
      }
  Listoperation(){
    this.router.navigateByUrl(`/listoperations`);
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
