import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CompanyComponent } from './components/company/company.component';
import { HeaderCompanyComponent } from './components/header-company/header-company.component';
import { FormsModule } from '@angular/forms';
import { BookingsComponent } from './components/bookings/bookings.component';
import { HomeComponent } from './components/home/home.component';

import { ReactiveFormsModule } from '@angular/forms';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { FormularioComponent } from './components/formulario/formulario.component';
import { CommonModule } from '@angular/common';
import { ControlpanelComponent } from './components/controlpanel/controlpanel.component';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CompanyComponent,
    HeaderCompanyComponent,
    ControlpanelComponent,
    BookingsComponent,
    HomeComponent,
    FormularioComponent,
    LoginComponent,
    LoginFormComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
