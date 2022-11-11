import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { AutocompleteMarqueService } from './services/autocomplete.service';
import { ReactiveFormsModule } from '@angular/forms';
//Add that module to @NgModule providers array.


@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule,BrowserModule,ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule,AutoCompleteModule],
  providers: [HttpClient,Storage,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
