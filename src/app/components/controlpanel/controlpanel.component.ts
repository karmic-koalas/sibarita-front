import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TbookingGET } from 'src/app/models/TbookingGET';
import { BookingsService } from 'src/app/services/bookings.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss'],
})
export class ControlpanelComponent implements OnInit {
  company: any = {};
  address: any = {};
  contact: any = {};
  checked: boolean = false;
  showedBookings: TbookingGET[] = [];
  showedBooking: TbookingGET = {
    client: 'a',
    owner: 'a',
    bookingToken: 'a',
    bookingDate: {
      day: 'a',
      hour: 'a',
    },
    numPerson: 0,
    contact: {
      phone: 0,
      email: '',
    },
    textarea: '',
  };

  constructor(
    private BookingsService: BookingsService,
    private route: ActivatedRoute,
    private SweetAlert: SweetAlertService,
    private CompaniesService: CompaniesService
  ) {
    this.loadCompany();
    this.getAllBookingsByOwner();
  }

  ngOnInit(): void {}

  async loadCompany() {
    // Esto saca la variable "company" de la URL. La variable "company" está declarada en el archivo app-routing.modules.ts
    const nameCompany = this.route.snapshot.paramMap.get('company');
    return this.CompaniesService.getCompanyByName(nameCompany)
      .then((result) => {
        if (result) {
          this.company = result;
          this.address = result.address;
          this.contact = result.contact;
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

  async getAllBookingsByOwner() {
    const company = this.route.snapshot.paramMap.get('company');
    return this.BookingsService.getAllBookingsByOwner(company)
      .then((res) => {
        console.log(res, 'pre if');
        if (res) {
          console.log(res);
          this.showedBookings = res;
        } else {
          console.log(
            'No se ha podido obtener el res porque si estuviera vacío te lo iba a dar igualmente'
          );
        }
      })
      .catch((err: any) => {
        this.SweetAlert.getError(err, 'No se pudo conectar con el servidor');
      });
  }

  isButtonPressed() {
    if (this.checked === false) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }
}
