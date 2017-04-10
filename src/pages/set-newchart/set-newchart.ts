import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-set-newchart',
  templateUrl: 'set-newchart.html'
})
export class SetNewchartPage {

  /*
   * Initialize local services and controllers
   * @param {AuthService} authService - Service for authentication
   * @param {LoadingController} loadingCtrl - Declare loading controller
   * @param {AlertControlller} alertCtrl - Declare alert controlller
   * @param {NavController} navController - Declare nav controlller
   */
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
