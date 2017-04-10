import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavParams, NavController } from 'ionic-angular';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';

import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';

import { ReportService } from '../../providers/report';
import { Report } from '../../models/report';
import { AuthService } from '../../providers/auth';

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
  mode: string = 'Add';
  role: string = 'User';

  /*
   * Initialize local services and controllers
   * @param {AuthService} authService - Service for authentication
   * @param {LoadingController} loadingCtrl - Declare loading controller
   * @param {AlertControlller} alertCtrl - Declare alert controlller
   * @param {NavController} navController - Declare nav controlller
   */
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private reportService: ReportService,
    private authService: AuthService) {

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

    const userRaw = this.authService.getActiveUser();
    this.role = userRaw.photoURL;
    console.log(this.role);
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
