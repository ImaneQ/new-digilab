import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  urlMeteo = "https://api.open-meteo.com/v1/forecast?latitude=46.19&longitude=6.24&hourly=temperature_2m";
  // on met cors  avant lien api
  urlGps = "https://cors-anywhere.herokuapp.com/https://api-adresse.data.gouv.fr/search/";


  getCoordinates(street: string, city: string, zip: number): Observable<any> {

    let paramsData = new HttpParams().append("q", `${street}, ${city}, ${zip}`)
    // `${street}, ${city}, ${zip}`) on l'apelle paramsData on ajoute parametres
    return this.http.get(this.urlGps,
      // ici tjs params ds httpParams
      { params: paramsData })
  }
  getWeather(longitude: Number, latitude: Number) {
    // 1 append/parametre

    let paramsLongLat = new HttpParams().append("latitude", `${latitude}`)
      .append("longitude", `${longitude}`)
      .append("hourly", `${'temperature_2m'}`)


    // return une obs. avec get/post... retourne automatiquement une Observable (flux de données)
    return this.http.get(this.urlMeteo, { params: paramsLongLat })
  }

}
