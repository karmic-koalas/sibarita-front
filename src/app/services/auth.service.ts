import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tuser } from '../models/Tuser';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = environment.indexApiUrl + '/auth/';
  private cookieValue: string;
  constructor(private cookieService: CookieService) {
    this.cookieValue = this.cookieService.get('owner');
  }

  async login(user: Tuser) {
    return fetch(this.urlApi + 'login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != null) {
          if (typeof res === 'object') {
            this.cookieService.set('owner', res.owner);
            this.saveUser(res.token);
            return 'camejo.session';
          }
          return res;
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
}
