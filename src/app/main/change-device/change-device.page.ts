import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-change-device',
  templateUrl: './change-device.page.html',
  styleUrls: ['./change-device.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ChangeDevicePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
