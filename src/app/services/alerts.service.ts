// src/app/services/alerts.service.ts
import { Injectable } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';

// Capacitor moderno
import { Device } from '@capacitor/device';
import { NativeBiometric } from 'capacitor-native-biometric';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  constructor(
    private alertCtrl: AlertController,
    private storage: StorageService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router
  ) {}

  // ------------------------------
  // Password helpers
  // ------------------------------
  public async setPass(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'SET PASSWORD',
      subHeader: 'Please SET your password',
      inputs: [{ name: 'password', type: 'password', placeholder: 'Password' }],
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'Confirm',
          handler: async (data: { password?: string }) => {
            const password = data?.password ?? '';
            await this.storage.set('user_pass', password);
            this.toastInfo('Now you can login, click LOCK again');
          },
        },
      ],
    });

    await alert.present().then(() => {
      const el = document.querySelector('ion-alert input') as HTMLInputElement | null;
      el?.focus();
    });
  }

  public async checkPass(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'LOGIN',
      subHeader: 'Please ENTER your password',
      inputs: [{ name: 'password', type: 'password', placeholder: 'Password' }],
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'Confirm',
          handler: async (data: { password?: string }) => {
            const entered = data?.password ?? '';
            const saved = (await this.storage.get('user_pass')) as string | null;

            if (!saved || entered !== saved) {
              this.toastError('Invalid password');
              return;
            }

            // Si estamos en dispositivo/emulador, ofrece activar biometría
            try {
              const info = await Device.getInfo();
              if (info.platform !== 'web') {
                const { isAvailable } = await NativeBiometric.isAvailable();
                if (isAvailable) {
                  await this.confirmEnableBiometrics();
                }
              } else {
                this.toastInfo("Biometric isn't activated on web; use an emulator/device.");
              }
            } catch {
              // ignora
            }

            // Login OK → navega a main
            this.router.navigateByUrl('/main');
          },
        },
      ],
    });

    await alert.present().then(() => {
      const el = document.querySelector('ion-alert input') as HTMLInputElement | null;
      el?.focus();
    });
  }

  // ------------------------------
  // Toasts
  // ------------------------------
  private async toastError(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      color: 'danger',
      animated: true,
      position: 'bottom',
    });
    await toast.present();
  }

  public async toastInfo(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'primary',
      animated: true,
      position: 'bottom',
    });
    await toast.present();
  }

  // ------------------------------
  // Biometría (Capacitor)
  // ------------------------------
  private async confirmEnableBiometrics(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Use ID',
      message: 'Do you want to use Biometric Authentication?',
      buttons: [
        { text: 'No', role: 'cancel', cssClass: 'primary' },
        {
          text: 'Yes',
          handler: async () => {
            await this.storage.set('biometric', 'true');
            this.toastInfo('Now you can use Biometric');
          },
        },
      ],
    });
    await alert.present();
  }

  /** Invoca el diálogo biométrico y navega a /main si autentica */
  public async fingerPrintAIO(): Promise<boolean> {
    try {
      const info = await Device.getInfo();
      if (info.platform === 'web') {
        this.toastInfo("Biometric isn't available on web; use an emulator/device.");
        return false;
      }

      const { isAvailable } = await NativeBiometric.isAvailable();
      if (!isAvailable) {
        this.toastError("This phone doesn't have biometric hardware or it is disabled");
        return false;
      }

      await NativeBiometric.verifyIdentity({
        reason: 'Authenticate',
        title: 'Biometric Authentication',
        subtitle: 'Please log in',
        description: 'Confirm your identity',
        useFallback: true, // PIN/patrón como respaldo del sistema
      });

      // Éxito → navega
      this.router.navigateByUrl('/main');
      return true;
    } catch (err: any) {
      this.toastError(err?.message ?? 'Biometric authentication cancelled/failed');
      return false;
    }
  }

  // ------------------------------
  // Comando CAN (sin cambios, ya migrado)
  // ------------------------------
  public sendPasswordCMD(uuid: string): void {
    const clean = uuid.replace(/[^0-9a-fA-F]/g, '').toLowerCase();
    if (clean.length !== 16) {
      alert('UUID must be 8 bytes (16 hex chars), e.g. "1c 20 21 e1 a9 46 13 53"');
      return;
    }
    const bytes: number[] = [];
    for (let i = 0; i < 16; i += 2) bytes.push(parseInt(clean.slice(i, i + 2), 16));

    const header = [67, 11, 0, 6, 170];
    let cks = 0;
    for (const n of header) cks ^= n;
    for (const n of bytes) cks ^= n;

    const cmdNumbers = [...header, ...bytes, cks, 13];
    const setPasswordCMD = cmdNumbers.join(',');
    alert(setPasswordCMD);
    // this.tcp.enviarMensaje(setPasswordCMD); // <- descomenta cuando tengas el servicio listo
  }
}
