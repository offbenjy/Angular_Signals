import {Component, computed, signal} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-delivery-add',
  templateUrl: './delivery-add.component.html',
  styleUrls: ['./delivery-add.component.scss']
})
export class DeliveryAddComponent {

  constructor(public dataService: DataService) {
  }

  addDelivery() {

  }


}
