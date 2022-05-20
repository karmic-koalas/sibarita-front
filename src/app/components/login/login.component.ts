import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private redirect: Router
  ) {
    if (this.authService.isLogged()) {
      this.redirect.navigate(['/profile']);
    }
  }

  ngOnInit(): void {
  }

}
