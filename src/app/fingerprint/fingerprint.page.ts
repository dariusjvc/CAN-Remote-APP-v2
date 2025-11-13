import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IonContent, IonText } from '@ionic/angular/standalone';

import { AlertsService } from '../services/alerts.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.page.html',
  styleUrls: ['./fingerprint.page.scss'],
  standalone: true,
  imports: [IonContent, IonText],
})
export class FingerprintPage implements OnInit {

  constructor(
    private alerts: AlertsService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {

  }

  // Se llama cuando se pulsa el candado
  async onLockClick() {
    console.log('[Fingerprint] lock clicked');
    await this.unLock();
  }

  async unLock() {
    try {
      const biometric = await this.storage.get<boolean>('biometric');
      console.log('[Fingerprint] biometric flag:', biometric);

      const res = await this.alerts.fingerPrintAIO();
      console.log('[Fingerprint] fingerPrintAIO result:', res);

      this.router.navigate(['/device']);

    } catch (err) {
      console.error('[Fingerprint] error in unLock:', err);

      this.router.navigate(['/device']);
    }
  }

  async removeData() {
    await Promise.all([
      this.storage.remove('user_pass'),
      this.storage.remove('biometric'),
    ]);
    this.alerts.toastInfo('Data Removed!');
  }
}
