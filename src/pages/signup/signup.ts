import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  role: string = "User";

  /*
   * Initialize local services and controllers
   * @param {AuthService} authService - Service for authentication
   * @param {LoadingController} loadingCtrl - Declare loading controller
   * @param {AlertControlller} alertCtrl - Declare alert controlller
   */
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up ...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        this.addUserInfo(form.value.name, form.value.role);
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  private addUserInfo(name: string, role: string) {
    this.authService.addUserInfo(name, role)
      .then(data => {
        console.log(data);
        const user = this.authService.getActiveUser();
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
