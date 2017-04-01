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
  role: string = "Basic";

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
      this.loadReports();
  }

  private loadReports() {
    this.reports = [];
    let reportsRaw: Report[] = [];
    this.reportService.fetchReports()
      .then(
        (reports) => {
          reports.forEach((report) => {
            reportsRaw.push(report.val());
          });
          let reportsIndex = {}; // name -> index of the report in reports
          for (let report of reportsRaw) {
            const index = reportsIndex[report.name];
            if (index == undefined) {
              this.reports.push(report);
              reportsIndex[report.name] = this.reports.length - 1;
            } else {
              console.log(report);
              console.log(this.reports[index]);
              if (report.timestamp > this.reports[index].timestamp) {
                console.log('swap');
                this.reports[index] = report;
              }
            }
          }
          console.log(this.reports);
      });
  }

  onNewReport() {
    this.navCtrl.push(NewReportPage);
  }

  onReportEditClicked(report: Report) {
    this.navCtrl.push(NewReportPage, {report: report, mode: 'Edit'});
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
