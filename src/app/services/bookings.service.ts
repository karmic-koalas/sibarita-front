import { Injectable } from '@angular/core';
import { TBookingDate } from '../models/TbookingDate';
import { TbookingDateData } from '../models/TbookingDateData';
import { Tbooking } from '../models/Tbooking';
import { TcheckingBooking } from '../models/TcheckingBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private urlApi = "http://localhost:3000/bookings/createNewBookings";

  resToken: string = '';

  bookingData: Tbooking = {
    client: '',
    owner: '',
    bookingDate: {
      day: '',
      hour: ''
    },
    tablesInBooking: ['']
  }

  constructor() { }

  checkAvailableBooking(checkBookingData: TcheckingBooking) {
    return fetch(this.urlApi, {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(checkBookingData)
    })
    .then(res => res.json())
    .then(res => {
      if (res != null) {
        console.log("Ta weno")
        return res;
      } else {
        console.log("No ta weno")
      }
    }).catch(() => {
      alert("Can't connect to server.")
    })
  }
  // Función adaptada: probar
  async postBooking(bookingData: Tbooking) {
    return fetch(this.urlApi, {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(bookingData)
    })
    .then(res => res.json())
    .then(res => {
      if (res != null) {
        console.log("Ta weno")
      } else {
        console.log("No ta weno")
      }
    })
    .catch(() => alert("Can't connect to server."))

  }
}