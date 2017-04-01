import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Location } from '../models/location';
import { Report} from '../models/report';
import { AuthService } from './auth';

import firebase from 'firebase';

@Injectable()
export class ReportService {
  constructor(
    public http: Http,
    private authService: AuthService) {
    console.log('Hello Report Provider');
  }

  addReport( name: string, condition: string, virusppm: number, contppm: number, location:Location ) {
    const time: number = new Date().getTime();    
    const user: any = this.authService.getActiveUser();
    const report = new Report(name, user.displayName, condition, virusppm, contppm, location, time);
    const rootRef = firebase.database().ref();
    const reportsRef = rootRef.child('reports');
    const newReportRef = reportsRef.push();
    newReportRef.set({
      name: report.name,
      reporter: report.reporter,
      condition: report.condition,
      virusppm: report.virusppm,
      contppm: report.contppm,
      location: report.location,
      time: report.timestamp
    });
  }

  fetchReports() {
    return firebase.database().ref('reports').once('value');
  }
}
