import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ReportsPage } from '../../pages/reports/reports';
import { HistoricTrendPage } from '../../pages/historic-trend/historic-trend';

import { AuthService } from '../../providers/auth';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  reportsPage = ReportsPage;
  historicTrendPage = HistoricTrendPage;
  role: string = 'User';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService) {}

  ngOnInit() {
    const userRaw = this.authService.getActiveUser();
    if (userRaw) {
      this.role = userRaw.photoURL;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
