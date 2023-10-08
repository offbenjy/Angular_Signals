import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from './swagger';
import { envrionment } from './evironments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: BASE_PATH, useValue: envrionment.apiUrl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
