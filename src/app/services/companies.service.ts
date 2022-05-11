import { Injectable } from '@angular/core';
import { Tcompany } from '../models/Tcompany';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private urlApi = "http://localhost:5000/companies";

  constructor() { }

  getAll() :Promise<Tcompany[]> {
    return fetch(this.urlApi)
      .then( response => response.status === 200 ? response.json() : false )
      .then( data => data );
  }

  getCompanyByName(name :string | null) :Promise<Tcompany> {
    return fetch(this.urlApi + `/${name}`)
      .then( response => response.status === 200 ? response.json() : false )
      .then( data => data );
  }
}
