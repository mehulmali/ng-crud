import {Component, OnInit} from '@angular/core';
import {Bike} from '../../shared/interfaces/bike';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  companies: any;
  selectedCompany: any;
  bike: Bike;
  bikes: any;
  imageError: string;
  isUpdating: boolean;

  constructor(private _router: Router, private route: ActivatedRoute) {
    this.bikes = JSON.parse(localStorage.getItem('BIKEDATA'));
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
    this.isUpdating = true;
    if (!bike.image) {
      this.imageError = 'Please choose a image.';
      return false;
    }

    _.find(this.bikes, function (bikeObj) {
      if (bikeObj.id === bike.id) {
        bikeObj = bike;
      }
    });

    localStorage.setItem('BIKEDATA', JSON.stringify(this.bikes));
    this._router.navigate(['bikes']);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bike = _.find(this.bikes, {'id': id});
    if (this.bike) {
      this.selectedCompany = _.find(this.companies, {'label': this.bike.company});
      if (!this.selectedCompany) {
        this.selectedCompany = this.companies[this.companies.length - 1];
      }
    } else {
      this._router.navigate(['404']);
    }
  }

}
