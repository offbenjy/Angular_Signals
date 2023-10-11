import { Component } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent {
  constructor(public dataService :DataService) {
  }
}
