import { Injectable } from '@angular/core';
import { Tbooking } from '../models/Tbooking';
import { TcheckingBooking } from '../models/TcheckingBooking';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private urlApi = 'http://localhost:3000/bookings/';

  resToken: string = '';

  bookingData: Tbooking = {
    client: '',
    owner: '',
    bookingDate: {
      day: '',
      hour: '',
    },
    numPerson: 0,
    textArea: '',
    contact: {
      phone: '',
      email: '',
    },
  };

  constructor() {}

  postBooking(checkBookingData: Tbooking) {
    return fetch(this.urlApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkBookingData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != null) {
          console.log('Ta weno');

          return res;
        } else {
          console.log('No ta weno');
        }
      })
      .catch(() => {
        alert("Can't connect to server.");
      });
  }

  async getBookingByToken(token: string | null) {
    const res = await fetch(this.urlApi + 'byToken/' + token);
    return await res.json();
  }
}
