import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, interval, Subscription } from 'rxjs';
import { Rutinas } from '../../../../app/controler/rutinas';
import { TcpService } from '../../../../app/controler/tcp.service';
import { AlertController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonCard, IonRow, IonGrid, IonMenuButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
//mport { IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.page.html',
  styleUrls: ['./inputs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonCard, IonRow, IonGrid, IonMenuButton, IonButtons, IonIcon],
})
export class InputsPage implements OnInit {

  //private updateSubscription: Subscription;
  private updateSubscription!: Subscription;
  public s2Flag: boolean= false;
  public s3Flag: boolean= false;
  public s4Flag: boolean= false;
  public s5Flag: boolean= false;
  public s6Flag: boolean= false;
  public s7Flag: boolean= false;
  public s10Flag: boolean= false;
  public s11Flag: boolean= false;
  public s12Flag: boolean= false;
  public s13Flag: boolean= false;
  public s14Flag: boolean= false;
  public s15Flag: boolean= false;
  public openFlag: boolean= false;
  public closeFlag: boolean= false;
  public m1Flag: boolean= false;
  public m2Flag: boolean= false;
  public s9Flag: boolean= false;

  constructor(public tcp: TcpService, public rutinas: Rutinas, public alertCtrl: AlertController) {}

  ngOnInit() {
    this.updateSubscription = interval(100).subscribe(
      (val) => { 
    this.s2Flag = this.rutinas.flagS2;
    this.s3Flag = this.rutinas.flagS3;
    this.s4Flag = this.rutinas.flagS4;
    this.s5Flag = this.rutinas.flagS5;
    this.s6Flag = this.rutinas.flagS6;
    this.s7Flag = this.rutinas.flagS7;
    this.s10Flag = this.rutinas.flagS10;
    this.s11Flag = this.rutinas.flagS11;
    this.s12Flag = this.rutinas.flagS12;
    this.s13Flag = this.rutinas.flagS13;
    this.s14Flag = this.rutinas.flagS14;
    this.s15Flag = this.rutinas.flagS15;
    this.openFlag = this.rutinas.flagOpen; //Review the source in PLC of this action - opening
    this.closeFlag = this.rutinas.flagClose; //Review the source in PLC of this action - closing
    this.m1Flag = this.rutinas.flagM1;
    this.m2Flag = this.rutinas.flagM2;
    this.s9Flag = this.rutinas.flagS9;
  })

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
            // this.tcp.sendRegisterToDataLogger("03");
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
            // this.tcp.sendRegisterToDataLogger("02");
            //console.log('Closing confirmation clicked');
          }
        }
      ]
    });
    confirm.then(res => res.present());
  }

}
