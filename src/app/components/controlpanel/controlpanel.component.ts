import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TbookingGET } from 'src/app/models/TbookingGET';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { CookieService } from 'ngx-cookie-service';

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
  personalInformationChecked: boolean = true;
  bookingsChecking: boolean = false;
  private sessionToken: string | null = sessionStorage.getItem('authorization');
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
  private cookieValue: string = '';
  constructor(
    private BookingsService: BookingsService,
    private SweetAlert: SweetAlertService,
    private CompaniesService: CompaniesService,
    private authService: AuthService,
    private redirect: Router,
    private cookieService: CookieService
  ) {
    if (!this.authService.isLogged()) {
      this.redirect.navigate(['/']);
    } else {
      this.cookieValue = this.cookieService.get('owner');
      this.loadCompany();
      this.getAllBookingsByOwner();
    }
  }

  ngOnInit(): void {}

  async loadCompany() {
    // Esto saca la variable "company" de la URL. La variable "company" está declarada en el archivo app-routing.modules.ts
    //const nameCompany = this.route.snapshot.paramMap.get('company');

    return this.CompaniesService.getCompanyByName(this.cookieValue)
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
        this.SweetAlert.getError('Error', 'No se pudo conectar con el Servidor');
        this.existCheking = false;
      });
  }

  async getAllBookingsByOwner() {
    //const company = this.route.snapshot.paramMap.get('company');
    // const kompany = 'Burguer_Lolo';
    return this.BookingsService.getAllBookingsByOwner(this.cookieValue)
      .then((res) => {
        if (res !== null) {
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

  async deleteOneBookingByToken(showedBooking: any) {
    //const tokenCompany = this.route.snapshot.paramMap.get('bookingToken');
    const dataSent: any = {
      bookingToken: showedBooking.bookingToken,
      token: sessionStorage.getItem('authorization'),
    };

    return await this.BookingsService.deleteBookingByToken(dataSent).then(() => {
      location.reload();
      this.bookingsChecking = true;
    });
  }

  isPersonalInformationButtonPressed() {
    if (this.personalInformationChecked === false) {
      this.personalInformationChecked = true;
      this.bookingsChecking = false;
    } else {
      this.personalInformationChecked = false;
    }
  }

  isBookingsButtonPressed() {
    if (this.bookingsChecking === false) {
      this.bookingsChecking = true;
      this.personalInformationChecked = false;
    } else {
      this.bookingsChecking = false;
      this.personalInformationChecked = true;
    }
  }
}
