import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-addresspopup',
  templateUrl: './addresspopup.page.html',
  styleUrls: ['./addresspopup.page.scss'],
})
export class AddresspopupPage implements OnInit {
  address: any = ''
  Latitude: any = ''
  Longitude: any = ''
  result: any
  countryName: any
  administrativeArea: any
  locality: any
  subLocality: any
  constructor(
    public navPrm: NavParams
  ) {
    this.address = navPrm.get('address')
    this.result = navPrm.get('result')
    console.log(this.result);

    this.Latitude = this.result.latitude
    this.Longitude = this.result.latitude
    this.countryName = this.result.countryName
    this.administrativeArea = this.result.administrativeArea
    this.locality = this.result.locality
    this.subLocality = this.result.subLocality
  }

  ngOnInit() {
  }

}
