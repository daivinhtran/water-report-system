import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /*
   * Initialize local services and controllers
   * @param {AuthService} authService - Service for authentication
   * @param {LoadingController} loadingCtrl - Declare loading controller
   * @param {AlertControlller} alertCtrl - Declare alert controlller
   * @param {NavController} navController - Declare nav controlller
   */
  constructor(public navCtrl: NavController) {
    
  }

}
