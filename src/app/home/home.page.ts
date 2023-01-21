import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';


import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { HintsPage } from '../hints/hints.page';

declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userLocation: any;
  userCity: any;
  lat: any;
  lng: any;
  location: any;
  latLngResult: any;
  userLocationFromLatLng: any;
  address: any = "Technogiq Solutions Pvt Ltd"
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef | any;
  map: any;
  constructor(public toastCtrl: ToastController,
    public zone: NgZone,
    private platform: Platform,
    private nativeGeocoder: NativeGeocoder,
    private modal: ModalController
  ) {
    this.forwardGeocode(this.address)
  }

  //call the showMap method after page is rendered
  ionViewDidEnter() {
    this.showMap(23.2189, 77.4329)
  }

  //on click the serach button
  onSearch() {
    this.forwardGeocode(this.address)
  }

  //Fetch the latitude & longitude from the address
  forwardGeocode(address: any) {
    if (this.platform.is('cordova')) {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.forwardGeocode(address, options)
        .then((result: NativeGeocoderResult[]) => {
          this.zone.run(() => {
            alert(JSON.stringify(result))
            alert(JSON.stringify(result[0]))
            this.lat = result[0].latitude;
            this.lng = result[0].longitude;
            this.showMap(this.lat, this.lng)
          })
        })
        .catch((error: any) => console.log(error));
    }
  }

  //Load the map on the page
  showMap(lat: any, long: any) {
    const location = new google.maps.LatLng(lat, long) //coratlim goa
    const options = {
      center: location,
      zoom: 20,
      disableDefaultUI: true
    }
    const marker = new google.maps.Marker({
      position: location,
      title: "location",
    });
    this.map = new google.maps.Map(this.mapRef.nativeElement, options, marker)

  }


  //some message from my side
  async onHintsClick() {
    const modal = await this.modal.create({
      component: HintsPage,
      cssClass: "modal-page-design"
    });
    modal.present();
  }

}
