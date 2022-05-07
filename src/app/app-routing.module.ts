import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFormComponent } from './components/bookingForm/booking.component';
import { CompanyComponent } from './components/company/company.component';
import { BookingsComponent } from './components/bookings/bookings.component'
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':company', component: CompanyComponent},
  {path: ':company/booking', component: BookingFormComponent},
  {path: ':company/:bookingToken', component: BookingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
