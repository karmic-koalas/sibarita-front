import { Injectable } from '@angular/core';
import { Tcompany } from '../models/Tcompany';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private urlApi = environment.indexApiUrl + '/companies';

  constructor() {}

  async getAll(): Promise<Tcompany[]> {
    const response = await fetch(this.urlApi);
    const data = response.status === 200 ? response.json() : false;
    return data;
  }

  async getCompanyByName(name: string | null): Promise<Tcompany> {
    const response = await fetch(this.urlApi + `/${name}`);
    const data = response.status === 200 ? response.json() : false;
    return data;
  }
}
