import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  date: Date = new Date();
  bookingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.bookingForm = this.initForm();
    // console.log(this.minTime)
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

  // Pone valor por defecto
  // onPatchValue(): void {
  //   this.bookingForm.patchValue( {name: 'César'} )
  // }

  onSubmit() {
    console.log('Formulario funciona');
  }
}
