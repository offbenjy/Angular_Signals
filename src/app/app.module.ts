import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from './swagger';
import { envrionment } from './evironments/environment';
import { DeliveryAddComponent } from './delivery-add/delivery-add.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    DeliveryAddComponent,
    DeliveryListComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: BASE_PATH, useValue: envrionment.apiUrl,},DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
