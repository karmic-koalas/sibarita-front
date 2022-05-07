import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { BookingFormComponent } from './components/bookingForm/booking.component';
import { FooterComponent } from './components/footer/footer.component';
import { CompanyComponent } from './components/company/company.component';
import { HeaderCompanyComponent } from './components/header-company/header-company.component';
import { FormsModule } from '@angular/forms';
import { BookingsComponent } from './components/bookings/bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingFormComponent,
    FooterComponent,
    CompanyComponent,
    HeaderCompanyComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
