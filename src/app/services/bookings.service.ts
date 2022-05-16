import { Injectable } from '@angular/core';
import { Tbooking } from '../models/Tbooking';
import { TcheckingBooking } from '../models/TcheckingBooking';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private urlApi = 'http://80.240.126.155:3000/bookings/';

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

  async getBookingByToken(token: string | null) {
    const res = await fetch(this.urlApi + 'byToken/' + token);
    return await res.json();
  }

  async getAllBookingsByOwner(owner: string | null) {
    const res = await fetch(this.urlApi + 'allByOwner/' + owner);
    console.log(res);
    return await res.json();
  }

  async postBooking(checkBookingData: Tbooking) {
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

  async deleteBookingByToken(token: string | null) {
    const res = await fetch(this.urlApi + 'byToken/delete/' + token, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  }

  // async editBookingByToken(checkBookingData: Tbooking) {
  //   return fetch(this.urlApi + 'byToken/put/' + token, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(checkBookingData),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res != null) {
  //         console.log(res);
  //         return res;
  //       } else {
  //         console.log('Falla');
  //       }
  //     })
  //     .catch(() => {
  //       alert("Can't connect to server.");
  //     });
  // }
}
