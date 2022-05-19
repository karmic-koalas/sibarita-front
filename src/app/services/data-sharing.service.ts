import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private authService: AuthService
  ) {
    if(this.authService.isLogged()) this.isUserLoggedIn.next(true);
  }
}
