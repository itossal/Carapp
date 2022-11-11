import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import {map} from 'rxjs/operators';
import {UserServicesPage} from 'src/app/dataServices/user-services/user-services.page';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteMarqueService implements AutoCompleteModule {

  constructor(private http: HttpClient,  private UserServicesPage : UserServicesPage) {}
   
   getResults(keyword:string) {
    if (!keyword) { return false; }


    /* this.UserServicesPage.getCarsMarks().subscribe(async (res) =>{
      console.log(res);
      return res.marquelist.nom;
      });*/
      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/text');
      headers.append('content-type','application/json');
       let options = { headers:headers}; 
    return this.http.get('https://it-open-sprite.com/carapp/cars.php?action=getallmarque&search=' + keyword,options).pipe(map(
       (result: any[]) => {
        let something : any ={}
        something = result;
       
       
          return  Object.values(something).filter(
             (item) => {
              let singleitem : any ={}
              singleitem = item;
              console.log('item',singleitem.nom)
                return singleitem.nom.toLowerCase().startsWith(
                   keyword.toLowerCase()
                );
             }
          );
       }
    ));
 }

}
