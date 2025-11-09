import { Component,HostListener } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { TcpService } from '../app/controler/tcp.service';

import { App } from '@capacitor/app';



import { Router } from '@angular/router';



import { ViewChildren, QueryList } from '@angular/core';
import { ModalController, ActionSheetController, PopoverController, MenuController } from '@ionic/angular';
import { IonApp, IonRouterOutlet , IonMenu, IonHeader, IonToolbar, IonTitle , IonContent, IonList, IonItem, IonLabel, IonIcon} from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon] 
})
export class AppComponent {

  // lastTimeBackPress = 0;
  // timePeriodToExit = 2000;

  //@ViewChildren(IonRouterOutlet) routerOutlets!: QueryList<IonRouterOutlet>;
async ngAfterViewInit() {
    await this.platform.ready();
    try { await StatusBar.setStyle({ style: StatusBarStyle.Light }); } catch {}
    try { await SplashScreen.hide(); } catch {}
  }

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
     private router: Router,
    public tcp: TcpService,


    // //public modalCtrl: ModalController,
    private menu: MenuController,
    // private actionSheetCtrl: ActionSheetController,
    // private popoverCtrl: PopoverController,
  ) {
    //this.initializeApp();
    // Initialize BackButton Eevent.
    //this.backButtonEvent();
  }


  // @HostListener('touchstart')
  // onTouchStart() {
  //     //this.restartIdleLogoutTimer();
  // }

  // private idleLogoutTimer: any;

  // ngOnInit() {
  //   this.menu.enable(false);
  //   //this.restartIdleLogoutTimer();
  // }  


//   restartIdleLogoutTimer() {
//     clearTimeout(this.idleLogoutTimer);
//     this.idleLogoutTimer = setTimeout(()=>{
//       if(this.router.url !== '/login'){this.logoutUser();}
//   //  },10000);
//     },60000);
//   }

//   logoutUser() {
//     this.tcp.desconectar();
//     //alert("Your session has expired, please login again");
//     alert("User inactivity detected, please login again");
//     this.router.navigateByUrl('/login');
//   }


//   // initializeApp() {
//   //   this.platform.ready().then(() => {
//   //     this.statusBar.styleDefault();
//   //     this.splashScreen.hide();
//   //   });
//   // }

//   initializeApp(): void {
//   this.platform.ready().then(async () => {
//     try {
//       await StatusBar.setStyle({ style: StatusBarStyle.Light });
//     } catch {}
//     try {
//       await SplashScreen.hide();
//     } catch {}
//   });
// }

  desconectar() {

    this.tcp.desconectar();
    this.router.navigateByUrl('/login');
    this.menu.enable(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


//   backButtonEvent() {
//     this.platform.backButton.subscribe(async () => {
//         // close action sheet
//         try {
//             const element = await this.actionSheetCtrl.getTop();
//             if (element) {
//                 element.dismiss();
//                 return;
//             }
//         } catch (error) {
//         }

//         // close popover
//         try {
//             const element = await this.popoverCtrl.getTop();
//             if (element) {
//                 element.dismiss();
//                 return;
//             }
//         } catch (error) {
//         }

//         // close modal
//         try {
//             const element = await this.modalCtrl.getTop();
//             if (element) {
//                 element.dismiss();
//                 return;
//             }
//         } catch (error) {
//             console.log(error);

//         }

//         // close side menua
//         try {
//             const element = await this.menu.getOpen();
//             if (element) {
//                 this.menu.close();
//                 return;

//             }

//         } catch (error) {

//         }

//         this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
//             // if (outlet && outlet.canGoBack()) {
//             //     outlet.pop();

//             // } else 
            
            

//             /*if (this.router.url == '/fingerprint') {


//               //alert("salimos del plc-info");

//               //this.tcp.desconectar();
//               this.router.navigateByUrl('/main');
             

//           }*/


// if (this.router.url == '/main/tabs/dashboard') {


//             //alert("salimos del plc-info");

//             //this.tcp.desconectar();
//             this.router.navigateByUrl('/main');
           

//         }


//             /*else if (this.router.url === '/about') {


//               //alert("salimos del about");

//               //this.tcp.desconectar();
//               this.router.navigateByUrl('/main');
             

//           }*/

            
//             else if (this.router.url === '/device') {


//               //alert("salimos de device");

//               this.tcp.desconectar();
//               this.router.navigateByUrl('/device');
             

//           }


//           else if (this.router.url === '/login') {


            


//                 if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
//                     // this.platform.exitApp(); // Exit from app
//                     //navigator['app'].exit.exitApp(); // work in ionic 4
//                      App.exitApp();


//                 } 
                
                
                
//                 else {
//                     // this.toast.show(
//                     //     `Press back again to exit App.`,
//                     //     '2000',
//                     //     'center')
//                     //     .subscribe(toast => {
//                     //         // console.log(JSON.stringify(toast));
//                     //     });
//                     this.lastTimeBackPress = new Date().getTime();
//                     this.router.navigateByUrl('/login');
//                 }

          
//           }
            
//             else if (this.router.url === '/login') {


//               //navigator['app'].exitApp();
//               App.exitApp();
//                 // if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
//                 //     // this.platform.exitApp(); // Exit from app
//                 //     navigator['app'].exitApp(); // work in ionic 4

//                 // } 
                
                
                
//                 // else {
//                 //     // this.toast.show(
//                 //     //     `Press back again to exit App.`,
//                 //     //     '2000',
//                 //     //     'center')
//                 //     //     .subscribe(toast => {
//                 //     //         // console.log(JSON.stringify(toast));
//                 //     //     });
//                 //     this.lastTimeBackPress = new Date().getTime();
//                 // }
//             }

            



//         });
//     });
// }


}
