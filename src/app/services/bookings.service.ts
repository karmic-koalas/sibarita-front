import { Injectable } from '@angular/core';
import { Tbooking } from '../models/Tbooking';
import { TcheckingBooking } from '../models/TcheckingBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private urlApi = "http://localhost:5000/bookings/";

  resToken: string = '';

  bookingData: Tbooking = {
    client: '',
    owner: '',
    bookingDate: {
      day: '',
      hour: ''
    },
    numPerson: 0
  }

  constructor() { }

  postBooking(checkBookingData: TcheckingBooking) {
    return fetch(this.urlApi, {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(checkBookingData)
    })
    .then(res => res.json())
    .then(res => {
      if (res != null) {
        console.log("Ta weno")
        return res
      } else {
        console.log("No ta weno")
      }
    }).catch(() => {
      alert("Can't connect to server.")
    })
  }

  getBookingByToken(token:string | null)
  {
    return fetch(this.urlApi+'byToken/'+token).then(res => res.json());
  }


 /*  // Función adaptada: probar
  postBooking(bookingData: Tbooking) {
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

  } */ 
}