import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TbookingGET } from 'src/app/models/TbookingGET';
import { BookingsService } from 'src/app/services/bookings.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  company: any = {};
  companyAddress: any;
  checked: boolean = true;
  booking: TbookingGET = {
    client: '',
    owner: '',
    bookingToken: '',
    bookingDate: {
      day: '',
      hour: '',
    },
    numPerson: 0,
    contact: {
      phone: 0,
      email: '',
    },
    textarea: '',
  };

  constructor(
    private CompaniesService: CompaniesService,
    private BookingsService: BookingsService,
    private route: ActivatedRoute,
    private SweetAlert: SweetAlertService
  ) {
    this.loadBookingByToken();
    this.loadCompany();
  }

  ngOnInit(): void {}

  async loadCompany() {
    // Esto saca la variable "company" de la URL. La variable "company" está declarada en el archivo app-routing.modules.ts
    const nameCompany = this.route.snapshot.paramMap.get('company');

    return this.CompaniesService.getCompanyByName(nameCompany)
      .then((result) => {
        if (result && result.owner === this.booking.owner) {
          this.company = result;
          this.companyAddress = result.address;
        } else {
          this.checked = false;
        }
      })
      .catch((err) => {
        console.log(err);
        this.SweetAlert.getError(
          'Error',
          'No se pudo conectar con el Servidor'
        );
        this.checked = false;
      });
  }
  async loadBookingByToken() {
    const token = this.route.snapshot.paramMap.get('bookingToken');
    return this.BookingsService.getBookingByToken(token).then((res) => {
      this.booking = res;
    });
  }
}
