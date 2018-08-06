import {Component, OnInit} from '@angular/core';
import {BikeConstant} from '../../../assets/json/bike.constant';
import {Bike} from '../../shared/interfaces/bike';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  companies: any;
  selectedCompany: any;
  bike: Bike;
  bikes: any;
  imageError: string;
  isCreating: boolean;

  constructor(private _router: Router) {
    const d = new Date();
    this.bike = {
      id: d.getTime(),
      name: '',
      company: '',
      image: ''
    };
    this.companies = [
      {id: 0, label: 'select company'},
      {id: 1, label: 'suzuki'},
      {id: 2, label: 'hero'},
      {id: 3, label: 'honda'},
      {id: 4, label: 'yamaha'},
      {id: 5, label: 'royal enfield'},
      {id: 6, label: 'tvs'},
      {id: 7, label: 'others'},
    ];
    this.selectedCompany = this.companies[0];
  }

  onSelect() {
    if (this.selectedCompany.id && this.selectedCompany.id !== (this.companies.length - 1)) {
      this.bike.company = this.selectedCompany.label;
    } else {
      this.bike.company = '';
    }
  }

  onChange(event) {
    this.readThis(event.target);

  }

  readThis(inputValue: any) {
    const file: File = inputValue.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      this.imageError = 'Please choose jpg or png file';
      this.bike.image = '';
      return false;
    }
    if (file.size > 100000) {
      this.imageError = 'Max file size less then 100kB';
      this.bike.image = '';
      return false;
    }
    const myReader: FileReader = new FileReader();
    this.imageError = '';
    myReader.onloadend = (e) => {
      this.bike.image = myReader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    };
    myReader.readAsDataURL(file);
  }

  onSubmit(bike) {
    this.isCreating = true;
    if (!bike.image) {
      this.imageError = 'Please choose a image.';
      return false;
    }

    this.bikes.push(this.bike);
    localStorage.setItem('BIKEDATA', JSON.stringify(this.bikes));
    this._router.navigate(['bikes']);
  }

  ngOnInit() {
    this.bikes = [];
    if (localStorage.getItem('BIKEDATA')) {
      this.bikes = JSON.parse(localStorage.getItem('BIKEDATA'));
    }
  }

}
