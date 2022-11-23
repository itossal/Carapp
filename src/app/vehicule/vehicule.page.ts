import { Component, OnInit, Injectable ,NgModule  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

//import {Plugins} from '@capacitor/core';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';
import {StorageServicesPage} from 'src/app/dataServices/storage-services/storage-services.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import {map} from 'rxjs/operators';
import { AutocompleteMarqueService } from '../services/autocomplete.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.page.html',
  styleUrls: ['./vehicule.page.scss'],
})


@NgModule({

  imports: [
    ReactiveFormsModule
  ],

})

export class VehiculePage implements OnInit {
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
nbr_jour_notif_compteur = 0;



  constructor(
public autocompletemarque : AutocompleteMarqueService,
    private router: Router,
    private http: HttpClient, 
    private UserServicesPage : UserServicesPage,
    public storage: Storage  
  ) {    const objects = [] }

 async ngOnInit() {

    await this.storage.create();
    this.currentUserinfo = await this.getStorageValue('resuserData').then(result => {
  
 return result;
 
 }).catch(e => {
       console.log('error: '+ e);
     }); 
     console.log('resuserData' , this.currentUserinfo);
    this.UserServicesPage.getCarsMarks().subscribe(async (res) =>{
      console.log(res);
      this.listmarques =res;
    

  });

  this.nbr_jour_notif_compteur = 0;
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
    console.log(item);
    this.id_marque =item.id;
    this.name_marque =item.name;
   
    this.UserServicesPage.getCarsModels(this.id_marque).subscribe(async (res) =>{
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
  this.UserServicesPage.getCarsModels(this.id_marque).subscribe(async (res) =>{
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
  this.UserServicesPage.getCarsModelsall().subscribe(async (res) =>{
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
  console.log("id_marque",this.id_marque);
  console.log("id_model",this.id_model);
  console.log(this.single_car);

let data="&id_user="+ this.currentUserinfo.id +"&id_marque="+this.id_marque+"&id_model="+this.id_model+"&nserie="+this.single_car['nserie']+"&compteur="+this.single_car['compteur']+"&nbr_jour_notif_compteur="+this.single_car['nbr_jour_notif_compteur']+"&datemc="+this.single_car['datemc'];
this.UserServicesPage.addnewCar(data).subscribe(async (res) =>{

console.log(res);
if (res.inserted == 'success'){
  let id = res.insert_id;
  this.router.navigateByUrl(`/mycar/${id}`);

}
//this.router.navigateByUrl(`/mycar/${id}`);
  
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
