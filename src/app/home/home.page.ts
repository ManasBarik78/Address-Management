import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';


import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { AddresspopupPage } from '../addresspopup/addresspopup.page';


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
  infoWindows = []
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
    let result = {
      latitude: 23.2189,
      longitude: 77.4329,
      addressLines: 'Technogiq Solutions Pvt Ltd.',
      countryName:'India',
      administrativeArea:"Madhya Pradesh",
      locality:"Bhopal",
      subLocality:"AreraColony"
    }
    this.showMap(result)
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
            this.lat = result[0].latitude;
            this.lng = result[0].longitude;
            this.showMap(result[0])
          })
        })
        .catch((error: any) => console.log(error));
    }
  }

  //Load the map on the page
  showMap(result: any) {
    const location = new google.maps.LatLng(result.latitude, result.longitude) //coratlim goa
    const options = {
      center: location,
      zoom: 20,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)
    this.addMarker(result);
  }

  addMarker(result: any) {
    let position = new google.maps.LatLng(result.latitude, result.longitude);
    let mapMarker = new google.maps.Marker({
      position: position,
      title: result.addressLines,
      latitude: result.latitude,
      longitude: result.longitude
    })
    mapMarker.setMap(this.map);
    this.addInfoWindowToMareker(mapMarker, result);
  }


  addInfoWindowToMareker(marker: any, result: any) {
    let infoWindowContnet = '<div id="content">' +
      '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
      '<p> Latitude: ' + marker.latitude + '</p>' +
      '<p> Longitude: ' + marker.longitude + '</p>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      Content: infoWindowContnet,
      pixelOffSet: new google.maps.Size(0, 20),

    })

    marker.addListener('click', () => {
      this.addressPopup(result, this.address);
    })
  }

  //Displaying the full address in popup
  async addressPopup(result: any, address: any) {
    const modal = await this.modal.create({
      component: AddresspopupPage,
      cssClass: "modal-page-design",
      componentProps: {
        result: result,
        address: address
      }
    });
    modal.present();
  }

}
