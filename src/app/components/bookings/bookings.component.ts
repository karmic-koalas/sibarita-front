import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tcompany } from 'src/app/models/Tcompany';
import { BookingsService } from 'src/app/services/bookings.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { SweetAlertArrayOptions } from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  company:any = {}
  checked:boolean = true

  constructor(
    private CompaniesService: CompaniesService,
    private BookingsService: BookingsService,
    private route: ActivatedRoute,
    private SweetAlert: SweetAlertService
    ) { 
      this.loadCompany()
      this.BookingsService.getBookingByToken("ten-walls-fry")
    }

  ngOnInit(): void {
  }

  async loadCompany()  {
    // Esto saca la variable "company" de la URL. La variable "company" está declarada en el archivo app-routing.modules.ts
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
}

async function loadBookingByToken() {

}
