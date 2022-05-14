import { Injectable } from '@angular/core';
import { Tuser } from '../models/Tuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = 'http://localhost:3000/auth/';

  constructor() { }

  async login(user: Tuser) {
    return fetch(this.urlApi + 'login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then( res => res.json())
      .then( res => {
          if (res != null) {
            console.log('Ta weno!');
            if(typeof res === 'string') {
              this.saveUser(res);
              return 'camejo.session';
            }
            return res;
          }
          console.log('No ta weno');
        })
      .catch( (err) => {
        console.log(err);
        alert("Can't connect to server.");
      });
  }

  isLogged() {
    const token = sessionStorage.getItem('user');

    if(typeof token === "string") {
      return fetch(this.urlApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(token),
      })
      .then( res => {
        console.log(res);
        
      })
      .catch( err => {
        console.log(err);
        alert("Can't connect to server.");
      });
    }
    
    
    return true;
  }

  private saveUser(token: string) {
    sessionStorage.setItem('user', token);
  }
}
