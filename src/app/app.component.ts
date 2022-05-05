import { Component } from '@angular/core';
import { CompaniesService } from './services/companies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sibarita-front';

  constructor(
    private CompaniesService :CompaniesService
  ) {
    this.CompaniesService.getAll();
  }
}


