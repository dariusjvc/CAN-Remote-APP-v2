// src/app/login/login.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service'

import { ToastController, AlertController, iosTransitionAnimation } from '@ionic/angular';


import {
  IonContent, IonItem, IonInput, IonGrid, IonRow, IonCol, IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonItem, IonInput, IonGrid, IonRow, IonCol, IonButton],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = '';
  password = '';

  //constructor(private router: Router) {}
  constructor(private loginService: LoginService, private router: Router, public toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
    this.presentAlert();
  }
  async loginAccess() {
    if (this.loginService.login(this.user, this.password)) {
      this.router.navigateByUrl('/device')
    } else {
      alert("Please, enter a correct user and password");
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      cssClass: 'my-alert',
      header: 'Alert',
      //mode: 'ios',
      subHeader: 'This is a warning message',
      message: 'The inappropriate use of this app is not allowed. <br/> If you are not an authorized user, please avoid using this app',
      buttons: ['OK']
    });

  }
}
