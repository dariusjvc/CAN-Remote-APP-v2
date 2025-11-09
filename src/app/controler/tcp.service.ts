import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutinas } from './rutinas';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TcpService {
  socket: any;
  public connected = false;

  constructor(
    public rutinas: Rutinas,
    public loadingController: LoadingController,
    private router: Router
  ) {}

  eventos(): Observable<string | ArrayBuffer | Uint8Array> {
    return new Observable(observer => {
      this.socket.onData = (asData: string | ArrayBuffer | Uint8Array) =>
        observer.next(asData);

      this.socket.onError = (asError: any) =>
        observer.next('socket.onError ' + String(asError));

      this.socket.onClose = (asClose: any) =>
        observer.next('socket.onClose ' + String(asClose));
    });
  }

  async conectar(ip: string, port: number): Promise<void> {

    this.router.navigateByUrl('/fingerprint');
    // this.socket = new (window as any).Socket();

    // this.eventos().subscribe(
    //   (data: string | ArrayBuffer | Uint8Array) =>
    //     this.rutinas.processData(String(data)),
    //   (error: any) => this.rutinas.ShowToast('Error: ' + String(error))
    // );

    // const socketState = JSON.parse(JSON.stringify(this.socket))._state;
    // if (socketState !== 0) {
    //   const loading1 = this.loadingController.create({ message: 'Disconnecting' });
    //   loading1.then(res => res.present());
    //   this.socket.close(
    //     () => {
    //       this.rutinas.ShowToast('socket.close.success');
    //       loading1.then(res => res.dismiss());
    //     },
    //     (error: any) => {
    //       this.rutinas.ShowAlert('socket.close.failed ' + String(error));
    //       loading1.then(res => res.dismiss());
    //     }
    //   );
    // }

    // const loading = this.loadingController.create({ message: 'Connecting' });
    // loading.then(res => res.present());

    // await this.socket.open(
    //   ip,
    //   port,
    //   (test: any) => {
    //     this.connected = true;
    //     this.rutinas.ShowToast('socket.open.success');
    //     loading.then(res => {
    //       res.dismiss();
    //       this.router.navigateByUrl('/fingerprint');
    //     });
    //   },
    //   (error: any) => {
    //     this.connected = false;
    //     this.rutinas.ShowAlert('socket.open.failed ' + String(error));
    //     loading.then(res => res.dismiss());
    //   }
    // );
  }

  enviarMensaje(mensaje: string): void {
    this.socket.write(
      JSON.parse('[' + mensaje + ']'),
      () => this.rutinas.ShowToast('Command sent'),
      (error: any) => this.rutinas.ShowAlert('Command NOT sent ' + String(error))
    );
  }

  desconectar(): void {
    const socketState = JSON.parse(JSON.stringify(this.socket))._state;
    if (socketState !== 0) {
      const loading1 = this.loadingController.create({ message: 'Disconnecting' });
      loading1.then(res => res.present());
      this.socket.close(
        () => {
          this.rutinas.ShowToast('socket.close.success');
          loading1.then(res => res.dismiss());
        },
        (error: any) => {
          this.rutinas.ShowAlert('socket.close.failed ' + String(error));
          loading1.then(res => res.dismiss());
        }
      );
    }
  }

  showSocketId(): void { alert(JSON.stringify(this.socket)); }
  showSocketStatus(): void { alert(this.connected); }
}
