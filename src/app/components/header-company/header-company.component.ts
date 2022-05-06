import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-company',
  templateUrl: './header-company.component.html',
  styleUrls: ['./header-company.component.scss']
})
export class HeaderCompanyComponent implements OnInit {

  @Input() img : string = '';
  @Input() owner : string = '';
  @Input() nickname : string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
