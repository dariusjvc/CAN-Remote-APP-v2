import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonCard, IonRow, IonGrid, IonMenuButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-plc-info',
  templateUrl: './plc-info.page.html',
  styleUrls: ['./plc-info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonCard, IonRow, IonGrid, IonMenuButton, IonButtons],
})
export class PlcInfoPage implements OnInit {

  public batteryVoltaje: string = "";
  public batteryPercent: string = "";
  public plcTemp: string = "";
  public segWork: string = "";
  public minWork: string = "";
  public hoursWork: string = "";
  public cyclesPartial: string = "";
  public cyclesTotal: string = "";
  public bypassNum: string = "";
  public batteryPercent2: string = "";
  // private updateSubscription: Subscription;


  constructor() { }

  ngOnInit() {
  }

}
