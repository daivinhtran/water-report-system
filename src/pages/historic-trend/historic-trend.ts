import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SetNewchartPage } from '../set-newchart/set-newchart';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricTrendPage');
  }

  onAddNewChart() {
    const modal = this.modalCtrl.create(SetNewchartPage);
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log(data);
        }
      });
  }


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
