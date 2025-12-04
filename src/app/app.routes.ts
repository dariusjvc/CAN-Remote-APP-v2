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
    path: 'fingerprint',
    loadComponent: () => import('./fingerprint/fingerprint.page').then( m => m.FingerprintPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'token',
    loadComponent: () => import('./token/token.page').then( m => m.TokenPage)
  },
  {
    path: 'plc-info',
    loadComponent: () => import('./main/dashboard/plc-info/plc-info.page').then( m => m.PlcInfoPage)
  },
  {
    path: 'extra-info',
    loadComponent: () => import('./main/dashboard/extra-info/extra-info.page').then( m => m.ExtraInfoPage)
  },
  {
    path: 'outputs',
    loadComponent: () => import('./main/dashboard/outputs/outputs.page').then( m => m.OutputsPage)
  },
  {
    path: 'inputs',
    loadComponent: () => import('./main/dashboard/inputs/inputs.page').then( m => m.InputsPage)
  },  {
    path: 'change-device',
    loadComponent: () => import('./main/change-device/change-device.page').then( m => m.ChangeDevicePage)
  },

];
