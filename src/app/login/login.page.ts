import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login.service'

import { ToastController, AlertController, iosTransitionAnimation } from '@ionic/angular';


import {
  IonContent,
  IonItem,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonAlert,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonAlert,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = '';
  password = '';
  isAlertOpen = false;
  constructor(private loginService: LoginService, private router: Router, public toastController: ToastController, private alertController: AlertController) { }

  
  ngOnInit() {
    console.log('[Login] ngOnInit');
    this.isAlertOpen = true; // se abre nada más entrar
  }

  setAlert(open: boolean) {
    this.isAlertOpen = open;
  }

  loginAccess() {
    console.log('[Login] loginAccess', this.user, this.password);

        if (this.loginService.login(this.user, this.password)) {
      this.router.navigateByUrl('/device')
    } else {
      alert("Please, enter a correct user and password");
    }
  }
}
