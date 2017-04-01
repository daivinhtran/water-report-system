import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavParams, NavController } from 'ionic-angular';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';

import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';

import { ReportService } from '../../providers/report';
import { Report } from '../../models/report';


@Component({
  selector: 'page-new-report',
  templateUrl: 'new-report.html'
})
export class NewReportPage implements OnInit {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  report: Report;
  mode = 'Add';

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private reportService: ReportService) {

  }

  ngOnInit() {
    const mode = this.navParams.get('mode');
    if (mode == 'Edit') {
      this.mode = 'Edit';
      const report = this.navParams.get('report');
      this.report = report;
      this.location = {
        lat: this.report.location.lat,
        lng: this.report.location.lng
      };
      this.locationIsSet = true;
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.reportService.addReport(
      form.value.name,
      form.value.condition,
      parseInt(form.value.virusppm),
      parseInt(form.value.contppm),
      this.location);
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.locationIsSet = false;
    form.reset();
    this.navCtrl.pop();
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {
      location: this.location, isSet: this.locationIsSet
    });
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log(this.location);
          this.location = data.location;
          this.locationIsSet = true;
        }
      });
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      ).catch(
        error => {
          loader.dismiss();
          console.log(error);
          const toast = this.toastCtrl.create({
            message: 'Could get location, please pick it manually!',
            duration: 2500
          });
          toast.present();
      })
  }
}
