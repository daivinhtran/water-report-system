import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HistoricTrendPage } from '../pages/historic-trend/historic-trend';
import { NewReportPage } from '../pages/new-report/new-report';
import { ReportPage } from '../pages/report/report';
import { ReportsPage } from '../pages/reports/reports';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth';
import { ReportService } from '../providers/report';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { SetLocationPage } from '../pages/set-location/set-location';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoricTrendPage,
    NewReportPage,
    ReportPage,
    ReportsPage,
    SigninPage,
    SignupPage,
    TabsPage,
    SetLocationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbj0OG2KcUBzWQZ8kZ0dYBIUMpi4qAOJg'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoricTrendPage,
    NewReportPage,
    ReportPage,
    ReportsPage,
    SigninPage,
    SignupPage,
    TabsPage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ReportService,
    Geolocation
  ]
})
export class AppModule {}
