import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ReportsPage } from '../../pages/reports/reports';
import { HistoricTrendPage } from '../../pages/historic-trend/historic-trend';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  reportsPage = ReportsPage;
  historicTrendPage = HistoricTrendPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
