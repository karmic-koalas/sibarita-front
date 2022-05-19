import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tbooking } from '../models/Tbooking';
import { TcheckingBooking } from '../models/TcheckingBooking';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private urlApi = environment.indexApiUrl + '/bookings/';

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
          return res;
        }
      })
      .catch(() => {
        alert("Can't connect to server.");
      });
  }

  async deleteBookingByToken(dataSent: any) {
    const res = await fetch(
      this.urlApi + 'byToken/delete/' + dataSent.bookingToken,
      {
        method: 'DELETE',
        headers: { authorization: dataSent.token },
        body: JSON.stringify(dataSent.bookingToken),
      }
    ).then((response) => response.json());
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
