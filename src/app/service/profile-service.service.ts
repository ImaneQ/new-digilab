import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  url ="https://restcountries.com/v3.1/all";
  constructor() { }
}
