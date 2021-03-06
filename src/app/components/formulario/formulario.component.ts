import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tbooking } from 'src/app/models/Tbooking';
import { BookingsService } from 'src/app/services/bookings.service';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  date: Date = new Date();
  bookingForm: FormGroup;
  checkBooking: Tbooking = {
    client: '',
    owner: '',
    bookingDate: {
      day: '',
      hour: '',
    },
    numPerson: 0,
    contact: {
      phone: '',
      email: '',
    },
    textArea: '',
  };
  company: string | null;
  isSubmitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private redirect: Router,
    private formBuilder: FormBuilder,
    private BookingsService: BookingsService
  ) {
    this.bookingForm = this.initForm();
    this.company = this.route.snapshot.paramMap.get('company');
  }

  ngOnInit(): void {
    this.bookingForm;
    //this.onPatchValue();
  }

  initForm(): FormGroup {
    return this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        persons: ['', [Validators.required]],
        date: ['', [Validators.required]],
        time: ['', [Validators.required]],
        tel: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/)]],
        coment: ['', [Validators.minLength(0), Validators.maxLength(140)]],
        email: ['', [Validators.minLength(0), Validators.email]],
      },
      { update: 'blur' }
    );
  }

  async postingBooking() {
    if (this.bookingForm.valid) {
      const newCamejo: Tbooking = {
        client: this.bookingForm.value.name,
        owner: this.company,
        bookingDate: {
          day: this.bookingForm.value.date,
          hour: this.bookingForm.value.time,
        },
        numPerson: this.bookingForm.value.persons,
        contact: {
          phone: this.bookingForm.value.tel,
          email: this.bookingForm.value.email,
        },
        textArea: this.bookingForm.value.coment,
      };
      await this.BookingsService.postBooking(newCamejo).then((res) => {
        return this.redirect.navigate(['/' + res.owner + '/' + res.bookingToken]);
      });
    }
  }

  // Pone valor por defecto
  // onPatchValue(): void {
  //   this.bookingForm.patchValue( {name: 'C??sar'} )
  // }

  async onSubmit() {
    this.isSubmitted = true;
    await this.postingBooking();
  }
}
