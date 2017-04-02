import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-set-newchart',
  templateUrl: 'set-newchart.html'
})
export class SetNewchartPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetNewchartPage');
  }

  onAddNewChart(form: NgForm) {
    this.viewCtrl.dismiss({
      form: form.value
    });
  }

  onAbort() {
    this.viewCtrl.dismiss();
  }
}
