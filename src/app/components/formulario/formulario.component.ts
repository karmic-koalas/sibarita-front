import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  date: Date = new Date;
  bookingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.bookingForm = this.initForm();
    // console.log(this.minTime)
  }

  ngOnInit(): void {
    this.bookingForm;
    //this.onPatchValue();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      persons: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      tel: ['', [Validators.required]]
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
