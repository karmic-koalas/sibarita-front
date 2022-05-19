import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean = false;

  constructor(
    private dataSharingService: DataSharingService,
    private authService: AuthService
  ) {
    this.dataSharingService.isUserLoggedIn.subscribe( (value: boolean) => {
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit(): void {}

  finishSession() {
    this.authService.logout();
    location.reload();
  }


}
