import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Tbooking} from 'src/app/models/Tbooking';
import {BookingsService} from 'src/app/services/bookings.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})

export class FormularioComponent implements OnInit {
  date: Date = new Date();
  bookingForm: FormGroup;
  checkBooking: Tbooking = {
    client: "",
    owner: "",
    bookingDate: {
        day: "",
        hour: ""
    },
    numPerson: 0,
    contact: { 
	    phone: "",
	    email: ""
    },
    textArea: ""
}
 

  constructor(
	  private redirect: Router,
	  private formBuilder: FormBuilder,
	  private bookingsService: BookingsService
  ) {
    this.bookingForm = this.initForm();
  }

  ngOnInit(): void {
    this.bookingForm;
    //this.onPatchValue();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      persons: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      tel: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      coment: ['', [Validators.minLength(0), Validators.maxLength(140)]],
      email: ['', [Validators.email]],
    });
  }

  async postingBooking() {
	  await this.bookingsService.postBooking(this.checkBooking).then(res => {
		  this.redirect.navigate(['/'+res.owner+'/'+res.bookingToken]);
	  })
	
  }

  // Pone valor por defecto
  // onPatchValue(): void {
  //   this.bookingForm.patchValue( {name: 'César'} )
  // }

  onSubmit() {
    console.log('Formulario funciona');
  }
}
