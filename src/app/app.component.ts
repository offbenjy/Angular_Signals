import {Component, OnInit, signal} from '@angular/core';
import {NgModule} from '@angular/core';
import {ClassesService} from './swagger';
import {UserServiceService} from './user-service.service';
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public userService: UserServiceService,public dataService: DataService) {
    this.dataService.addNewDelivery(false);
  }

  onKeyUpUsername(value: string) {
    this.userService.username.set(value)
    console.log(this.userService.currentUser())
  }

  onKeyUpPassword(value: string) {
    this.userService.password.set(value)
    console.log(this.userService.currentUser())
  }
}
