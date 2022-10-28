import { Component, OnInit ,Injectable  } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-storage-services',
  templateUrl: './storage-services.page.html',
  styleUrls: ['./storage-services.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class StorageServicesPage {

  public _storage: Storage ;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: any, value: any) {
    this._storage.set(key, value);
  }

  public get(key:any){
    alert(key)
    this._storage.forEach((v,k)=>{
      console.log('value',v);
      console.log('key',k);

      })
    return this._storage.get(key);
  }

}
