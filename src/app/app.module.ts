import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { BookingFormComponent } from './components/bookingForm/booking.component';
import { FooterComponent } from './components/footer/footer.component';
import { CompanyComponent } from './components/company/company.component';
import { HeaderCompanyComponent } from './components/header-company/header-company.component';
import { FormsModule } from '@angular/forms';
import { BookingsComponent } from './components/bookings/bookings.component';
import { HomeComponent } from './components/home/home.component';

// PrimeNG
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingFormComponent,
    FooterComponent,
    CompanyComponent,
    HeaderCompanyComponent,
    BookingsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
