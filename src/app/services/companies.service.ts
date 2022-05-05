import { Injectable } from '@angular/core';
import { Tcompany } from '../models/Tcompany';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private url = "http://localhost:3000/api/companies";

  constructor() { }

  getAll() :Promise<void> {
    return fetch(this.url)
      .then( response => response.json() )
      .then( data => console.log(data) );
  }
}
