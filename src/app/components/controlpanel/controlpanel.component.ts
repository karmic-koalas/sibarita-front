import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TbookingGET } from 'src/app/models/TbookingGET';
import { AuthService } from 'src/app/services/auth.service';
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
  existCheking: boolean = false;
  personalInformationChecked: boolean = false;
  bookingsChecking: boolean = false;
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
    private CompaniesService: CompaniesService,
    private authService: AuthService,
    private redirect: Router
  ) {
    if (!this.authService.isLogged()) {
      this.redirect.navigate(['/']);
    }

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
          this.existCheking = false;
        }
      })
      .catch((err) => {
        console.log(err);
        this.SweetAlert.getError(
          'Error',
          'No se pudo conectar con el Servidor'
        );
        this.existCheking = false;
      });
  }

  async getAllBookingsByOwner() {
    const company = this.route.snapshot.paramMap.get('company');

    return this.BookingsService.getAllBookingsByOwner(company)
      .then((res) => {
        console.log(res, 'pre if');
        if (res !== null) {
          console.log(res);
          this.showedBookings = res;
          console.log(this.showedBookings);
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

  async deleteOneBookingByToken(token: string) {
    //const tokenCompany = this.route.snapshot.paramMap.get('bookingToken');
    return await this.BookingsService.deleteBookingByToken(token).then(() => {
      location.reload();
      this.bookingsChecking = true;
    });
  }

  isPersonalInformationButtonPressed() {
    console.log('personal information button works');
    if (this.personalInformationChecked === false) {
      this.personalInformationChecked = true;
    } else {
      this.personalInformationChecked = false;
    }
  }

  isBookingsButtonPressed() {
    console.log('bookings button works');
    if (this.bookingsChecking === false) {
      this.bookingsChecking = true;
    } else {
      this.bookingsChecking = false;
    }
  }
}
