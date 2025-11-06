import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  {
    path: 'device',
    loadComponent: () => import('./device/device.page').then( m => m.DevicePage)
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then( m => m.MainPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./main/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'device',
    loadComponent: () => import('./main/device/device.page').then( m => m.DevicePage)
  },
];
