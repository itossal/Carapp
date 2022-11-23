import { Component, OnInit, Injectable ,NgModule ,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

//import {Plugins} from '@capacitor/core';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import {StorageServicesPage} from 'src/app/dataServices/storage-services/storage-services.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import {map} from 'rxjs/operators';
import { AutocompleteMarqueService } from '../services/autocomplete.service';
import { ReactiveFormsModule } from '@angular/forms';
import {IonSlides } from '@ionic/angular';  


@Component({
  selector: 'app-listoperations',
  templateUrl: './listoperations.page.html',
  styleUrls: ['./listoperations.page.scss'],
})
export class ListoperationsPage implements OnInit  {
  currentUserinfo;
  car_id;
  listoperationall;
  listoperationlenght;
  constructor(

    private router: Router,
    private http: HttpClient, 
    private route : ActivatedRoute,
    private UserServicesPage : UserServicesPage,
    public storage: Storage  

  ) {}

  async ngOnInit() {

    await this.storage.create();
  
      }
      async ionViewDidEnter(){
        this.currentUserinfo = await this.getStorageValue('resuserData').then(result => {
    
          return result;
          
          }).catch(e => {
                console.log('error: '+ e);
              }); 
      
              this.car_id = await this.getStorageValue('car_id').then(result => {
                console.log("car_idlistop",result);
                return result;
              
                }).catch(e => {
                      console.log('error: '+ e);
                    }); 
                    this.UserServicesPage.getlistOperation( this.currentUserinfo.id ,this.car_id).subscribe(async (res) =>{
                      
           

                      if (Array.isArray(res.listoperation)){

                        

           
                        this.listoperationall = res.listoperation;
                        this.listoperationlenght = true;
                     Object.values(this.listoperationall).filter(  
                        (item) => { 
                          console.log(item);
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
  segmentButtonClicked(ev: any) {
   //console.log('Segment button clicked', ev);  
    const value = ev.target.value;
    console.log('Segment button clicked value', value);  
    if (value == 'entretien'){
      this.UserServicesPage.getlistOperationbytype( this.currentUserinfo.id ,this.car_id,1).subscribe(async (res) =>{
        if (res.listoperation ){
    
        
          this.listoperationall = res.listoperation;
        
       Object.values(this.listoperationall).filter(  
          (item) => { 
            console.log(item);
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
    if (value == 'carburant'){
      this.UserServicesPage.getlistOperationbytype( this.currentUserinfo.id ,this.car_id,2).subscribe(async (res) =>{
        if (res.listoperation ){
    
          this.listoperationall = res.listoperation;
        
        
       Object.values(this.listoperationall).filter(  
          (item) => { 
            console.log(item);
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
    if (value == 'tax'){
      this.UserServicesPage.getlistOperationbytype( this.currentUserinfo.id ,this.car_id,3).subscribe(async (res) =>{
        if (res.listoperation ){
    
        
          this.listoperationall = res.listoperation;
        
       Object.values(this.listoperationall).filter(  
          (item) => { 
            console.log(item);
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
    if (value == 'all'){
      this.UserServicesPage.getlistOperation( this.currentUserinfo.id ,this.car_id).subscribe(async (res) =>{
        if (res.listoperation ){
          this.listoperationall = res.listoperation;
        
       Object.values(this.listoperationall).filter(  
          (item) => { 
            console.log(item);
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


 

  renderOperation(id){
    console.log(id);
        this.router.navigateByUrl(`/sigleoperationdetail/${id}`);
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
