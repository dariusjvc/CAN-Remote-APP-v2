import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  login(user: string, password: string) {
    let userAdmin = {
      user: 'admin',
      password: 'admin'
    }
    if (userAdmin.user === user && userAdmin.password === password) {
      return true
    } else {
      return false
    }
  }
}
