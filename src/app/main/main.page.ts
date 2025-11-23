// src/app/main/main.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet,   // si usas <ion-router-outlet> para las pages de las tabs
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  imports: [
    CommonModule,
    FormsModule,

    // 👇 IMPORTANTE: componentes que usas en el HTML
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
    IonRouterOutlet,   // solo si en el html lo usas
  ],
})
export class MainPage {}
