import { Component, OnInit, Injectable ,NgModule  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';

import { AutocompleteMarqueService } from '../services/autocomplete.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-singleoperation',
  templateUrl: './singleoperation.page.html',
  styleUrls: ['./singleoperation.page.scss'],
})
export class SingleoperationPage implements OnInit {
  public dateValue: any;
  todolistoperation;
  listoperationalleveything;
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
whitespace;
  constructor(  public autocompletemarque : AutocompleteMarqueService,
    private router: Router,
    private http: HttpClient, 
    private route : ActivatedRoute,
    private UserServicesPage : UserServicesPage,
    private toastController: ToastController,
    public storage: Storage ) { }



    async presentToast(position: 'top' | 'middle' | 'bottom') {
      const toast = await this.toastController.create({
        message: 'Vous ne pouvez pas ajouter + que 5 opération en mode hors connexion !!',
        duration: 1500,
        position: position
      });
      await toast.present();
    }


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
      console.log('  this.car_id ',result);
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
                    var urlimagecar = '../../assets/logos/'+newstr.toLowerCase()+".png";

                    this.checkIfImageExists(urlimagecar, (exists) => {
                     if (exists) {
                       console.log('Image exists. ');
                       this.logo= '../../assets/logos/'+newstr.toLowerCase()+".png";
               
                     } else {
                       console.error('Image does not exists.');
                       this.logo = '../../assets/logos/'+newstr.toLowerCase()+".jpg";
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
              public onlineOffline: boolean = navigator.onLine;
  single_operation: any={};
 async newOperation(){
    console.log(this.single_operation);
    console.log(this.currentUserinfo);
  let  data = "operation_name="+this.single_operation.operation_name+"&type="+this.single_operation.type+"&compteur="+this.single_operation.compteur+"&price="+this.single_operation.price+"&litres="+this.single_operation.litres+"&datexp="+this.single_operation.datexp+"&nbjournotif="+this.single_operation.nbjournotif+"&kmexp="+this.single_operation.kmexp+"&nbkmnotif="+this.single_operation.nbkmnotif;
  if (!this.onlineOffline){
    var todoarray = [];
    var tabop = [];
    var tab = [];
    var biggertab = [];
var storage_exist = 0;
    this.todolistoperation =  await  this.getStorageValue('todolistoperation').then(result => {
    
    // console.log(result);
      return result;
  
        }).catch(e => {
              console.log('error: '+ e);
         });
   
         if (this.todolistoperation == null && this.todolistoperation == undefined){
          setTimeout(()=>{
       

            tab['car_id'] = this.car_id;
            tab['user_id'] = this.currentUserinfo.id;
            tab['data'] = data;
            todoarray.push(tab);
          
  
          },500);
  
    
          setTimeout(()=>{
      this.setStorageValue('todolistoperation', todoarray);
          },1500);
         }else{
         // console.log(this.todolistoperation);  
         var tab_length = 0;
         Object.values(this.todolistoperation).filter(  
          (item) => { 
            tab_length ++;
          todoarray.push(item);
        //  biggertab.push(item);  
        });
console.log('tab_length' ,  tab_length);
        if (tab_length >= 4){

          this.presentToast('middle');
            this.router.navigateByUrl(`/mycar/${this.car_id}`);
        }else{

          setTimeout(()=>{
            tab['car_id'] = this.car_id;
            tab['user_id'] = this.currentUserinfo.id;
            tab['data'] = data;
            todoarray.push(tab);
          //  biggertab.push(tab);  
  
          },500);
  
    
          setTimeout(()=>{
         
      this.setStorageValue('todolistoperation', todoarray);
          },1500);
        }

    





      }


      console.log(this.todolistoperation);
       
        

   this.listoperationalleveything = await    this.getStorageValue('listoperationalleveything').then(result => {
      console.log('listoperationalleveything',result)
      return result;
  
        }).catch(e => {
              console.log('error: '+ e);
         });

         const now = new Date();
         function formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
      
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
      
          return [year, month, day].join('-');
      }

         tabop['ID'] = '';
         tabop['compteur'] = this.single_operation.compteur;
         tabop['date_crea'] = formatDate(now);
         tabop['datexp'] = this.single_operation.datexp
         tabop['done'] = 0;
         tabop['id_car'] = this.car_id;
          tabop['id_user'] =  this.currentUserinfo.id;
          tabop['kmexp'] = this.single_operation.nbkmnotif;
          tabop['litres'] = this.single_operation.litres;
          tabop['nbjournotif'] = this.single_operation.nbjournotif;
          tabop['nbkmnotif'] = this.single_operation.kmexp;
          tabop['operation_name'] = this.single_operation.operation_name;
          tabop['price'] = this.single_operation.price;
          tabop['type'] = this.single_operation.type;

          

          if (tab_length >= 4){

          
          }else{
            biggertab.push(tabop); 
          }
          Object.values(this.listoperationalleveything).filter(  
            (item) => { 
            //  console.log(item);
              biggertab.push(item);
          });
          //console.log(biggertab);
//console.log(this.listoperationalleveything);
     this.setStorageValue('listoperationalleveything',biggertab);

  this.router.navigateByUrl(`/mycar/${this.car_id}`);
  }else{
    this.UserServicesPage.addnewOperation( this.currentUserinfo.id ,this.car_id ,data ).subscribe(async (res) =>{
      if (res.inserted == 'success'){
  
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
