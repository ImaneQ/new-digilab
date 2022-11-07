import { FormControl } from '@angular/forms';
import { GlobalHttpService } from './global-http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


// ? Class mère
export class DataService extends GlobalHttpService {
  urlApi = "https://restcountries.com/v3.1/all";

  // on redefinit a l'aide de la methode super tous les attributs de la class mere

  // constructor( ){
    // super()
  // }
  getCountries(): Observable<any> {
    return this.http.get(this.urlApi)
  }

  getUserList() {
    this.userService
  }

// ! on envoie les datas via get() avec les HTTP PARAMS


  getJokes(): Observable<any> {
    return this.http.get<any>(this.urlJokes);

    console.log(this.urlJokes);
  }



}
