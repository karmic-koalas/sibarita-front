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
  btnPersonalInformation = document.getElementById('#personal-information-button') as HTMLButtonElement | null;
  btnBookingButton = document.getElementById('#bookings-button') as HTMLButtonElement | null;

  company: any = {};
  address: any = {};
  contact: any = {};
  image: any = {};
  owner: any;
  nickname!: string;
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
    textArea: '',
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
          this.nickname = result.nickname;
          this.owner = result.owner;
          this.image = result.image;
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
      this.showedBookings = this.showedBookings.filter( bookings => bookings._id != showedBooking._id);
      this.bookingsChecking = true;
    }).catch((err) => {
      console.log(err);
      this.SweetAlert.getError('Error', 'Se ha producido un error en el Servidor');
    });
  }

  async deleteBookingAlert(showedBooking: any) {
    const checking = await this.SweetAlert.elminateBooking('¿Está seguro?', `Va a eliminar la reserva ${showedBooking.bookingToken}`)
    if (checking != false) this.deleteOneBookingByToken(showedBooking);
  }

  isPersonalInformationButtonPressed() {
    this.personalInformationChecked = true;
    if (this.btnPersonalInformation != null) this.btnPersonalInformation.disabled = true;
    if (this.btnBookingButton != null) this.btnBookingButton.disabled = false;
    this.bookingsChecking = false;
  }

  isBookingsButtonPressed() {
    this.bookingsChecking = true;
    if (this.btnPersonalInformation != null) this.btnPersonalInformation.disabled = false;
    if (this.btnBookingButton != null) this.btnBookingButton.disabled = true;
    this.personalInformationChecked = false;
  }
}
