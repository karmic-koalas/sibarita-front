import { Injectable } from '@angular/core';
import { Tuser } from '../models/Tuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = 'http://80.240.126.155:3000/auth/';

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
    const token = sessionStorage.getItem('authorization');

    if(token !== null) {
      return fetch(this.urlApi, {
        method: 'POST',
        headers: { authorization: token }
      })
      .then( res => res.json())
      .then( res => res)
      .catch( err => {
        console.log(err);
        alert("Can't connect to server.");
      });
    }
    return false;
  }

  private saveUser(token: string) {
    sessionStorage.setItem('authorization', token);
  }
}
