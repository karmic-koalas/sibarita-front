import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public redirect: Router) {}

  goto(direction: string) {
    this.redirect.navigate([direction]);
  }

  ngOnInit(): void {}
}
