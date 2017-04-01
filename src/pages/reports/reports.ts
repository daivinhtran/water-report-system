import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { ReportService } from '../../providers/report';
import { NewReportPage } from '../../pages/new-report/new-report';
import { Report } from '../../models/report';

import { Location} from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
  reports: Report[] = [];
  keys: string[] = [];
  location: Location = {
    lat: 34.0544754,
    lng: -84.0008426
  };
  locationIsSet: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reportService: ReportService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation) {
    // this.onLocate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

  ionViewCanEnter() {
    this.reports = [];
    this.reportService.fetchReports()
      .then(
        (reports) => {
          reports.forEach((report) => {
            this.keys.push(report.key);
            this.reports.push(report.val());
          });
          console.log(this.reports);
        });
  }

  onNewReport() {
    this.navCtrl.push(NewReportPage);
  }

  onReportEditClicked(report: Report, index: number) {
    const key = this.keys[index];
    this.navCtrl.push(NewReportPage, {report: report, mode: 'Edit'});
    console.log(report, index);
  }

  // private onLocate() {
  //   const loader = this.loadingCtrl.create({
  //     content: 'Getting your Location...'
  //   });
  //   loader.present();
  //   this.geolocation.getCurrentPosition()
  //     .then(
  //       location => {
  //         loader.dismiss();
  //         console.log(location);
  //         this.location.lat = location.coords.latitude;
  //         this.location.lng = location.coords.longitude;
  //         this.locationIsSet = true;
  //       }
  //     ).catch(
  //       error => {
  //         loader.dismiss();
  //         console.log(error);
  //         const toast = this.toastCtrl.create({
  //           message: 'Could not get location, please turn on GPS!',
  //           duration: 2500
  //         });
  //         toast.present();
  //     })
  // }
}
