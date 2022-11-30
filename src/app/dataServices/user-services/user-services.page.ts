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
      return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/users.php?action=login&email=${email}&password=${password}`,options));
  
    }
    getuserLogindata(email): Observable<any> {
      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/text');
      headers.append('content-type','application/json');
       let options = { headers:headers}; 
        return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/users.php?action=logindata&email=${email}`,options));
    
      }
    createAccount(email,nom,password,phone): Observable<any> {
      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/text');
      headers.append('content-type','application/json');
       let options = { headers:headers}; 
        return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/users.php?action=signin&nom=${nom}&phone=${phone}&email=${email}&password=${password}`,options));
    
      }
      updateAccount(id_user,email,nom,password,phone): Observable<any> {
        var headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/text');
        headers.append('content-type','application/json');
         let options = { headers:headers}; 
          return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/users.php?action=updateaccount&id_user=${id_user}&nom=${nom}&phone=${phone}&email=${email}&password=${password}`,options));
      
        }
      getUserCars(id): Observable<any> {
        var headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/text');
        headers.append('content-type','application/json');
         let options = { headers:headers}; 
          return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getcars&id_user=${id}`,options));
      
        }
        getUserCarByid(id_user,id_car): Observable<any> {
          var headers = new HttpHeaders();
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/text');
          headers.append('content-type','application/json');
           let options = { headers:headers}; 
            return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getcarbyid&id_user=${id_user}&id_car=${id_car}`,options));
        
          }
        getMarqueModelnames(mark,model): Observable<any> {
          var headers = new HttpHeaders();
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/text');
          headers.append('content-type','application/json');
           let options = { headers:headers}; 
            return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getmarkmodelname&id_marque=${mark}&id_model=${model}`,options));
        
          }
        getCarsMarks(): Observable<any> {
          var headers = new HttpHeaders();
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/text');
          headers.append('content-type','application/json');
           let options = { headers:headers}; 
            return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getallmarque`,options));
        
          }

          getCarsModels(id_marque): Observable<any> {
            var headers = new HttpHeaders();
            headers.append('Access-Control-Allow-Origin' , '*');
            headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            headers.append('Accept','application/text');
            headers.append('content-type','application/json');
             let options = { headers:headers}; 
              return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getmodel&marque=${id_marque}`,options));
          
            }
            getCarsModelsall(): Observable<any> {
              var headers = new HttpHeaders();
              headers.append('Access-Control-Allow-Origin' , '*');
              headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
              headers.append('Accept','application/text');
              headers.append('content-type','application/json');
               let options = { headers:headers}; 
                return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getallmodels`,options));
            
              }
              addnewCar(data): Observable<any> {
                var headers = new HttpHeaders();
                headers.append('Access-Control-Allow-Origin' , '*');
                headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                headers.append('Accept','application/text');
                headers.append('content-type','application/json');
                 let options = { headers:headers}; 
                  return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=addnewcar&${data}`,options));
              
                }

                changeCarcompteur(id_user,id_car,compteur): Observable<any> {
                  var headers = new HttpHeaders();
                  headers.append('Access-Control-Allow-Origin' , '*');
                  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                  headers.append('Accept','application/text');
                  headers.append('content-type','application/json');
                   let options = { headers:headers}; 
                    return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=changecarcompteur&id_user=${id_user}&id_car=${id_car}&compteur=${compteur}`,options));
                
                  }

                  addnewOperation(user_id,car_id,data): Observable<any> {
                    var headers = new HttpHeaders();
                    headers.append('Access-Control-Allow-Origin' , '*');
                    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                    headers.append('Accept','application/text');
                    headers.append('content-type','application/json');
                     let options = { headers:headers}; 
                      return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=addnewoperation&${data}&user_id=${user_id}&car_id=${car_id}`,options));
                  
                    }
                    updateOperation(user_id,operation_id,car_id,data): Observable<any> {
                      var headers = new HttpHeaders();
                      headers.append('Access-Control-Allow-Origin' , '*');
                      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                      headers.append('Accept','application/text');
                      headers.append('content-type','application/json');
                       let options = { headers:headers}; 
                        return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=updateoperation&${data}&user_id=${user_id}&car_id=${car_id}&operation_id=${operation_id}`,options));
                    
                      }
                    
                    getlistOperation(user_id,car_id): Observable<any> {
                      var headers = new HttpHeaders();
                      headers.append('Access-Control-Allow-Origin' , '*');
                      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                      headers.append('Accept','application/text');
                      headers.append('content-type','application/json');
                       let options = { headers:headers}; 
                        return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getlistoperation&user_id=${user_id}&car_id=${car_id}`,options));
                    
                      }
                      getlistOperationalltime(user_id,car_id): Observable<any> {
                        var headers = new HttpHeaders();
                        headers.append('Access-Control-Allow-Origin' , '*');
                        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                        headers.append('Accept','application/text');
                        headers.append('content-type','application/json');
                         let options = { headers:headers}; 
                          return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getlistoperationalltime&user_id=${user_id}&car_id=${car_id}`,options));
                      
                        }
                      getlistOperationnotif(user_id,car_id): Observable<any> {
                        var headers = new HttpHeaders();
                        headers.append('Access-Control-Allow-Origin' , '*');
                        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                        headers.append('Accept','application/text');
                        headers.append('content-type','application/json');
                         let options = { headers:headers}; 
                          return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getlistoperationotif&user_id=${user_id}&car_id=${car_id}`,options));
                      
                        }
                      getlistOperationbytype(user_id,car_id,type): Observable<any> {
                        var headers = new HttpHeaders();
                        headers.append('Access-Control-Allow-Origin' , '*');
                        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                        headers.append('Accept','application/text');
                        headers.append('content-type','application/json');
                         let options = { headers:headers}; 
                          return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getlistoperationbytype&user_id=${user_id}&car_id=${car_id}&type=${type}`,options));
                      
                        }
                        getlistOperationbyId(user_id,car_id,id): Observable<any> {
                          var headers = new HttpHeaders();
                          headers.append('Access-Control-Allow-Origin' , '*');
                          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                          headers.append('Accept','application/text');
                          headers.append('content-type','application/json');
                           let options = { headers:headers}; 
                            return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=getlistoperationbyid&id=${id}&user_id=${user_id}&car_id=${car_id}`,options));
                        
                          }
                          setUserToken(user_id,token): Observable<any> {
                            var headers = new HttpHeaders();
                            headers.append('Access-Control-Allow-Origin' , '*');
                            headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                            headers.append('Accept','application/text');
                            headers.append('content-type','application/json');
                             let options = { headers:headers}; 
                           
                              const encoded = encodeURI(token);
                              return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/users.php?action=setusertoken&user_id=${user_id}&token=${encoded}`,options));
                          
                            }
                            setOperationstate(user_id,car_id,id,state): Observable<any> {
                              var headers = new HttpHeaders();
                              headers.append('Access-Control-Allow-Origin' , '*');
                              headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                              headers.append('Accept','application/text');
                              headers.append('content-type','application/json');
                               let options = { headers:headers}; 
                             
                                
                                return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=setoperationstate&id=${id}&user_id=${user_id}&car_id=${car_id}&state=${state}`,options));
                            
                              }  
                              
                              updateCar(car_id,data): Observable<any> {
                                var headers = new HttpHeaders();
                                headers.append('Access-Control-Allow-Origin' , '*');
                                headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                                headers.append('Accept','application/text');
                                headers.append('content-type','application/json');
                                 let options = { headers:headers}; 
                                  return( this.http.get(`http://autoapp.it-open-sprite.com/carapp/cars.php?action=updatecar&${data}&car_id=${car_id}`,options));
                              
                                }                       
              
}
