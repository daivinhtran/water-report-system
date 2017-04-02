import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SetNewchartPage } from '../set-newchart/set-newchart';
import { ReportService } from '../../providers/report';

/*
  Generated class for the HistoricTrend page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-historic-trend',
  templateUrl: 'historic-trend.html'
})
export class HistoricTrendPage {
  months: string[] = ['Jan', 'Feb', 'Mar',
            'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'];

  charts: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private reportService: ReportService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricTrendPage');
  }

  onAddNewChart() {
    const modal = this.modalCtrl.create(SetNewchartPage);
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.getHistory(data.form.name, parseInt(data.form.year), data.form.ppm);
        }
      });
  }

  private getHistory(name: string, year: number, ppm: string) {
    let filteredReports = [];
    this.reportService.fetchReports()
      .then(
        (reports) => {
          reports.forEach((reportRaw) => {
            const report = reportRaw.val();
            let reportYear = new Date(report.timestamp).getFullYear();
            if (reportYear == year && report.name == name && report[ppm] != undefined) {
              let reportMonth = new Date(report.timestamp).getMonth();
              filteredReports.push({
                month: reportMonth,
                ppm: report[ppm]
              });
            }

          });
          console.log(filteredReports);
          this.charts.push(this.makeChartData(filteredReports, name, ppm, year))
          console.log(this.charts);
      });
  }

  private makeChartData(filteredReports: any[], name: string, ppm: string, year: number) {
    let data = [];

    // putting ppm values into each bucket
    for (let filteredReport of filteredReports) {
      if (data[filteredReport.month] == undefined) {
        data[filteredReport.month] = [];
      }
      data[filteredReport.month].push(filteredReport.ppm);
    }
    console.log(data);
    for (let i in data) {
      data[i] = this.average(data[i]);
    }
    console.log(data);

    let tempData = [];
    for (let i = 0; i < 12; i++) {
      if (data[i] == undefined) {
        tempData[i] = null;
      } else {
        tempData[i] = data[i];
      }
    }

    return {
      dataset: [tempData],
      options: {
        responsive: true,
        legend: {
            display: false
        },
        title: {
            display: true,
            text: name + ' ' + ppm + ' ' + year.toString(),
            position: 'bottom'
        }
      }
    }
  }

  private average(nums: number[]) {
    let sum = 0;
    for (let num of nums) {
      sum += num;
    }
    return sum / nums.length;
  }
}
