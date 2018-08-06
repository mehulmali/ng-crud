import {Component, OnInit} from '@angular/core';
import {Bike} from '../../shared/interfaces/bike';
import {BikeConstant} from '../../../assets/json/bike.constant';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss']
})
export class BikeListComponent implements OnInit {

  bikes: Bike[];
  query: string;

  constructor() {
    // if localstorage not found then set localstorage with 'BIKEDATA' key
    if (!localStorage.getItem('BIKEDATA')) {
      localStorage.setItem('BIKEDATA', JSON.stringify(BikeConstant));
    }

    // Set localstorage data
    this.bikes = JSON.parse(localStorage.getItem('BIKEDATA'));
  }

  onDelete(bikeObj) {
    const index = this.bikes.indexOf(bikeObj);
    this.bikes.splice(index, 1);
    localStorage.setItem('BIKEDATA', JSON.stringify(this.bikes));
  }

  ngOnInit() {

  }

}
