import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  {
    path: 'device',
    loadComponent: () => import('./device/device.page').then( m => m.DevicePage)
  },
];
