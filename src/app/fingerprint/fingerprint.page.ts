import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Ionic Standalone imports (solo lo que usas en la plantilla)
import {
  IonContent,
  IonGrid,
  IonRow,
  IonItem,
  IonText
} from '@ionic/angular/standalone';

import { AlertsService } from '../services/alerts.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.page.html',
  styleUrls: ['./fingerprint.page.scss'],
  standalone: true,
  imports: [IonContent, IonGrid, IonRow, IonItem, IonText],
})
export class FingerprintPage implements OnInit {

  constructor(
    private alerts: AlertsService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.unLock();
  }

  async unLock() {
    const biometric = await this.storage.get<boolean>('biometric');

    await this.alerts.fingerPrintAIO();
  }

  async removeData() {
    await Promise.all([
      this.storage.remove('user_pass'),
      this.storage.remove('biometric'),
    ]);
    this.alerts.toastInfo('Data Removed!');
  }
}
