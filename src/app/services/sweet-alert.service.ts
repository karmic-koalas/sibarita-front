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
}
