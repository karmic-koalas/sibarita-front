import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  company :any = {};
  address :any = {};
  contact :any = {};
  checked :boolean = false;

  constructor(
    private route :ActivatedRoute,
    private CompaniesService :CompaniesService,
    private SweetAlert :SweetAlertService
  ) {
    this.loadCompany();
  }

  async loadCompany()  {
    const nameCompany = this.route.snapshot.paramMap.get('company');
    return this.CompaniesService.getCompanyByName(nameCompany)
      .then( result => {
        if(result) {
          this.company = result;
          this.address = result.address;
          this.contact = result.contact;
          this.checked = true;
        }
      })
      .catch( err => {
        console.log(err);
        this.SweetAlert.getError('Error', 'No se pudo conectar con el Servidor');
      });
  }

  ngOnInit(): void {
  }

}
