import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  /*
   * Initialize local services and controllers
   * @param {AuthService} authService - Service for authentication
   * @param {LoadingController} loadingCtrl - Declare loading controller
   * @param {AlertControlller} alertCtrl - Declare alert controlller
   * @param {NavController} navController - Declare nav controlller
   */
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController) {}

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in ...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        console.log(this.authService.getActiveUser());
        // this.navCtrl.setRoot(TabsPage);
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
