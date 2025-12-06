import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonCard, IonRow, IonGrid, IonMenuButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { TcpService } from '../../../../app/controler/tcp.service';
import { Rutinas } from '../../../../app/controler/rutinas';
import { AlertController } from '@ionic/angular';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.page.html',
  styleUrls: ['./extra-info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonCard, IonRow, IonGrid, IonMenuButton, IonButtons, IonIcon],
})
export class ExtraInfoPage implements OnInit {


  private updateSubscription!: Subscription;
  public plcApagadoFlag: boolean = false;

 constructor(public tcp: TcpService, public rutinas: Rutinas, public alertCtrl: AlertController) { }

ngOnInit() {
    this.updateSubscription = interval(100).subscribe(
      (val) => {
      this.plcApagadoFlag = this.rutinas.flagPLCApagado;
    });
  }

  showConfirmShutDown() {
    const confirm = this.alertCtrl.create({
      header: 'OHF ShutDown',
      message: 'Are you sure you want to ShutDown the OHF?',
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
            var byteCMD = '67,11,0,6,174,1,0,0,0,0,0,0,0,225,13'; //SHUTDOWN ORDER
            this.tcp.enviarMensaje(byteCMD);
            //this.tcp.sendRegisterToDataLogger("05");
            //console.log('Opening confirm clicked');
          }
        }
      ]
    });
    confirm.then(res => res.present());
  }

  showConfirmReset() {
    const confirm = this.alertCtrl.create({
      header: 'RESTART PLC',
      message: 'Are you sure you want to RESTART the PLC?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            var byteCMD = '67,11,0,6,174,0,1,0,0,0,0,0,0,225,13'; //RESTART ORDER
            this.tcp.enviarMensaje(byteCMD);
            //this.tcp.sendRegisterToDataLogger("01");
            //console.log('Opening confirm clicked');
          }
        }
      ]
    });
    confirm.then(res => res.present());
    }

}
