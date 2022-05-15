import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tuser } from 'src/app/models/Tuser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private redirect: Router
  ) {
    this.loginForm = this.initForm();
  }

  ngOnInit(): void {}

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  onSubmit() {
    if(this.loginForm.valid) {
      this.authService.login( this.loginForm.value )
        .then( res => {
          if(typeof res !== 'string') {
            alert(res.message);
          } else {
            this.redirect.navigate(['/profile']);
          }
        })
        .catch( err => {
          console.log(err);
        })
    }
    
    // this.authService.login();
  }

}
