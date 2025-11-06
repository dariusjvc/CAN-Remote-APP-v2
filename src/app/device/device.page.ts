import { Component, OnInit } from '@angular/core';
import { TcpService } from '../controler/tcp.service';
import { Router } from '@angular/router';
import { Rutinas } from '../../app/controler/rutinas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent, IonItem, IonInput, IonGrid, IonRow, IonCol, IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
  imports: [CommonModule, FormsModule, IonContent, IonItem, IonInput, IonGrid, IonRow, IonCol, IonButton],

})
export class DevicePage {

  public ip: string = '';
  public port: number | null = null;
  public mensaje: string = '';
  public pruebaMensaje: string = '';

  constructor(public tcp: TcpService, private router: Router, private rutinaTest: Rutinas) {
  }

  async conectar() {
    const ip = this.ip?.trim();
    const portNum = typeof this.port === 'string' ? parseInt(this.port, 10) : this.port;

    if (!ip || portNum == null || Number.isNaN(portNum)) {
      alert('Please, enter a valid IP and port');
      return;
    }

    try {
      const conectarResult = await this.tcp.conectar(ip, portNum);
    } catch (e) {
      alert('Connection error: ' + (e as any));
    }
  }


  enviarMensaje() {
    this.tcp.enviarMensaje(this.mensaje);
  }

}
