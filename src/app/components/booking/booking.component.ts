import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  company :any = {};
  checked :boolean = true;

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
        } else {
          this.checked = false;
        }
      })
      .catch( err => {
        console.log(err);
        this.SweetAlert.getError('Error', 'No se pudo conectar con el Servidor');
        this.checked = false;
      });
  }

  ngOnInit(): void {
  }

}
