import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  getError(title :string, text :string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text
    });
  }

  elminateBooking(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      focusCancel: true,
      confirmButtonColor: '#1aa3e8',
      cancelButtonColor: '#dc3b3b',
      confirmButtonText: 'Sí',
      focusConfirm: false,
      iconColor: '#dc3b3b',
      buttonsStyling: true
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Reserva Eliminada')
        return true;
      }
      return false;
    })
  }
}
