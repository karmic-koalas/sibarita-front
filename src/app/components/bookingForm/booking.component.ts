import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tbooking } from 'src/app/models/Tbooking';
import { BookingsService } from 'src/app/services/bookings.service';
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

  response: Tbooking = {
    client: '',
    owner: '',
    bookingDate: {
      day: '',
      hour: ''
    },
    tablesInBooking: ['']
  }

  checkBooking: Tbooking = {
    client: '',
    owner: '',
      bookingDate: {
          day: '',
          hour: ''
      },
    tablesInBooking: ['']
  }

  constructor(
    private route :ActivatedRoute,
    private CompaniesService :CompaniesService,
    private SweetAlert :SweetAlertService,
    private BookingsService: BookingsService
  ) {
    this.loadCompany();
  }

  /* queCojonesPasa(){
    console.log(this.checkBooking)
  } */ 


  async checkingAvailableBookings() {
    return this.BookingsService.checkAvailableBooking(this.checkBooking).then(res => {
      this.response = res;
      console.log(this.response);
    })
  }

  async loadCompany()  {
    // Esto saca la variable "company" de la URL. La variable "company" está declarada en el archivo app-routing.modules.ts
    const nameCompany = this.route.snapshot.paramMap.get('company');
    return this.CompaniesService.getCompanyByName(nameCompany)
      .then( result => {
        if(result) {
          this.company = result;
          this.checkBooking.owner = result.owner
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
