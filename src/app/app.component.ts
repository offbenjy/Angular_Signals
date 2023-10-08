import { Component, OnInit, signal } from '@angular/core';
import { NgModule } from '@angular/core';
import { ClassesService } from './swagger';
import { UserServiceService } from './user-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit { 
  

    constructor(public userService: UserServiceService
      ) {
        
       }

  ngOnInit(): void {
    
  }


}
