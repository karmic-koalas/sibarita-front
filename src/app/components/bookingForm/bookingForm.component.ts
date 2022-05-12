// import { Component, OnInit } from '@angular/core';
// 
// import { ActivatedRoute, Router } from '@angular/router';
// import { Tbooking } from 'src/app/models/Tbooking';
// import { BookingsService } from 'src/app/services/bookings.service';
// import { CompaniesService } from 'src/app/services/companies.service';
// import { SweetAlertService } from 'src/app/services/sweet-alert.service';
// 
// @Component({
//   selector: 'app-booking',
//   templateUrl: './bookingForm.component.html',
//   styleUrls: ['./bookingForm.component.scss']
// })
// export class BookingFormComponent implements OnInit {
// 
//   company :any = {};
//   checked :boolean = true;
// 
//   response: Tbooking = {
//     client: '',
//     owner: '',
//     bookingDate: {
//       day: '',
//       hour: ''
//     },
//     numPerson: 0
//   }
// 
//   checkBooking: Tbooking = {
//     client: '',
//     owner: '',
//       bookingDate: {
//           day: '',
//           hour: ''
//       },
//       numPerson: 0
//   }
// 
//   constructor(
//     private route: ActivatedRoute,
//     private redirect: Router,
//     private companiesService: CompaniesService,
//     private sweetAlert: SweetAlertService,
//     private bookingsService: BookingsService,
//   ) {
//     this.loadCompany();
//   }
// 
//   /* queCojinesPasa(){
//     console.log(this.checkBooking)
//   } */ 
// 
// 
//   async postBookingClick() {
//     return this.bookingsService.postBooking(this.checkBooking).then(res => {
//       this.redirect.navigate(['/'+res.owner+'/'+res.bookingToken]);
//     })
//   }
// 
//   async loadCompany()  {
//     // Esto saca la variable "company" de la URL. La variable "company" está declarada en el archivo app-routing.modules.ts
//     const nameCompany = this.route.snapshot.paramMap.get('company');
//     return this.companiesService.getCompanyByName(nameCompany)
//       .then( result => {
//         if(result) {
//           this.company = result;
//           this.checkBooking.owner = result.owner
//         } else {
//           this.checked = false;
//         }
//       })
//       .catch( err => {
//         console.log(err);
//         this.sweetAlert.getError('Error', 'No se pudo conectar con el Servidor');
//         this.checked = false;
//       });
//   }
// 
//   ngOnInit(): void {
// 
//   }
// 
// }
