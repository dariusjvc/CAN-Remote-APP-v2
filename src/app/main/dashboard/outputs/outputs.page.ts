import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, interval, Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { TcpService } from '../../../../app/controler/tcp.service';
import { Rutinas } from '../../../../app/controler/rutinas';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonToggle, IonCol, IonRow, IonCard, IonIcon, IonGrid, IonMenuButton, IonButtons} from '@ionic/angular/standalone';

@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.page.html',
  styleUrls: ['./outputs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonToggle, IonCol, IonRow, IonCard, IonIcon, IonGrid, IonMenuButton, IonButtons]
})
export class OutputsPage implements OnInit {

  private updateSubscription!: Subscription;
  public h3Flag: boolean= false;
  public h4Flag: boolean= false;
  public h5Flag: boolean= false;
  public h9Flag: boolean= false;
  public h6Flag: boolean= false;
  public h7Flag: boolean= false;
  public h8Flag: boolean= false;
  public h16Flag: boolean= false;
  public h12Flag: boolean= false;
  public h11Flag: boolean= false;
  public h10Flag: boolean= false;
  public h15Flag: boolean= false;
  public h14Flag: boolean= false;
  public h13Flag: boolean= false;
  public h19Flag: boolean= false;
  public h23Flag: boolean= false;
  public h22Flag: boolean= false;
  public h17Flag: boolean= false;
  public h21Flag: boolean= false;
  public h20Flag: boolean= false;   
  //public h27Flag: boolean= false;  
  public h26Flag: boolean= false;
  public h18Flag: boolean= false;
  public h25Flag: boolean= false; 
  public h24Flag: boolean= false;              
  public unlockFlag: boolean= false;
  public lockFlag: boolean= false;
  public hornsFlag: boolean= false;
  public nightModeFlag: boolean= false;
  public timeBypass: string = "";
  public activeFlag: boolean= false;
  public nightModeFlag2: boolean= false;

   constructor(public tcp: TcpService, public rutinas: Rutinas, public alertCtrl: AlertController) { }

 ngOnInit() {
    this.updateSubscription = interval(100).subscribe(
      (val) => {
    this.h19Flag = this.rutinas.flagH19;
    this.h23Flag = this.rutinas.flagH23;
    this.h22Flag = this.rutinas.flagH22;
    this.h17Flag = this.rutinas.flagH17;
    //this.h21Flag = this.rutinas.flagH21;
    this.h20Flag = this.rutinas.flagH20;
    this.h14Flag = this.rutinas.flagH14;
    this.h26Flag = this.rutinas.flagH26;
    this.h18Flag = this.rutinas.flagH18;
    this.h25Flag = this.rutinas.flagH25;
    this.h24Flag = this.rutinas.flagH24;
    this.h3Flag = this.rutinas.flagH3;
    this.h4Flag = this.rutinas.flagH4;
    this.h5Flag = this.rutinas.flagH5;
    this.h9Flag = this.rutinas.flagH9;
    this.h6Flag = this.rutinas.flagH6;
    this.h7Flag = this.rutinas.flagH7;
    this.h8Flag = this.rutinas.flagH8;
    this.h16Flag = this.rutinas.flagH16;
    this.h12Flag = this.rutinas.flagH12;
    this.h11Flag = this.rutinas.flagH11;
    this.h10Flag = this.rutinas.flagH10;
    this.h15Flag = this.rutinas.flagH15;
    this.h13Flag = this.rutinas.flagH13;
    this.hornsFlag = this.rutinas.flagHorns;
    this.unlockFlag = this.rutinas.flagOpen;
    this.lockFlag = this.rutinas.flagClose;
    this.nightModeFlag = this.rutinas.flagNightMode;
    this.nightModeFlag2 = this.rutinas.flagNightMode2;

    if(this.rutinas.bypassTime===undefined)
    {
      this.timeBypass = "--"
    }
    else{
      this.timeBypass=this.rutinas.bypassTime;

    }

    this.activeFlag = this.rutinas.flagBypass;
  });
  }

  showConfirmOpen() {
    const confirm = this.alertCtrl.create({
      header: 'Twistlock UNLOCKING',
      message: 'Are you sure you want to OPEN the Twistlock?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            var byteCMD = '67,11,0,6,166,1,0,0,0,0,0,0,0,233,13'; //UNLOCK ORDER
            this.tcp.enviarMensaje(byteCMD);
            //this.tcp.sendRegisterToDataLogger("03");
            //console.log('Opening confirm clicked');
          }
        }
      ]
    });
    confirm.then(res => res.present());
  }

  showConfirmClose() {
    const confirm = this.alertCtrl.create({
      header: 'Twistlock LOCKING',
      message: 'Are you sure you want to CLOSE the Twistlock?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            var byteCMD = '67,11,0,6,167,1,0,0,0,0,0,0,0,232,13'; //LOCK ORDER
            this.tcp.enviarMensaje(byteCMD);
            //this.tcp.sendRegisterToDataLogger("02");
            //console.log('Closing confirmation clicked');
          }
        }
      ]
    });
    confirm.then(res => res.present());
  }

  showConfirmBypass() {
    const confirm = this.alertCtrl.create({
      header: 'Landing Pins BYPASS',
      message: 'Are you sure you want to BYPASS the landing pins?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Bypass disagree clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            var byteCMD = '67,11,0,6,169,1,0,0,0,0,0,0,0,230,13'; //BYPASS ORDER
            this.tcp.enviarMensaje(byteCMD);
            //this.tcp.sendRegisterToDataLogger("04");
            //console.log('Bypass confirm clicked');
          }
        }
      ]
    });
    confirm.then(res => res.present());
  }

  sendNightModeCMD(){
    var nightModeCMD = '67,11,0,6,170,1,0,0,0,0,0,0,0,229,13';
    this.tcp.enviarMensaje(nightModeCMD);
  }
}
