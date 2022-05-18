import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tuser } from '../models/Tuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = environment.indexApiUrl + '/auth/';

  constructor() {}

  async login(user: Tuser) {
    return fetch(this.urlApi + 'login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((token) => token.json())
      .then((token) => {
        if (token != null) {
          if (typeof token === 'string') {
            this.saveUser(token);
            return true;
          }
          return token;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Can't connect to server.");
      });
  }

  isLogged() {
    const token = sessionStorage.getItem('authorization');

    if (token !== null) {
      return fetch(this.urlApi, {
        method: 'POST',
        headers: { authorization: token },
      })
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => {
          console.log(err);
          alert("Can't connect to server.");
        });
    }
    return false;
  }

  private saveUser(token: string) {
    sessionStorage.setItem('authorization', token);
  }

  logout(){
    sessionStorage.clear();
    location.reload();
  }
}
