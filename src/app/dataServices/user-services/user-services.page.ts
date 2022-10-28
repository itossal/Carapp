import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import {Observable} from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.page.html',
  styleUrls: ['./user-services.page.scss'],
})
@Injectable({
  providedIn : 'root',
})
export class UserServicesPage  {

  constructor(private http:HttpClient) { }

  submitLogin(email,password): Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/text');
    headers.append('content-type','application/json');
     let options = { headers:headers}; 
      return( this.http.get(`https://it-open-sprite.com/carapp/users.php?action=login&email=${email}&password=${password}`,options));
  
    }
 
    createAccount(email,nom,password,phone): Observable<any> {
      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/text');
      headers.append('content-type','application/json');
       let options = { headers:headers}; 
        return( this.http.get(`https://it-open-sprite.com/carapp/users.php?action=signin&nom=${nom}&phone=${phone}&email=${email}&password=${password}`,options));
    
      }
      getUserCars(email,nom,password,phone): Observable<any> {
        var headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/text');
        headers.append('content-type','application/json');
         let options = { headers:headers}; 
          return( this.http.get(`https://it-open-sprite.com/carapp/cars.php?action=signin&nom=${nom}&phone=${phone}&email=${email}&password=${password}`,options));
      
        }
}
