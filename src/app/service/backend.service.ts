import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = `${environment.API_URL}/api/users`;
  urlAdd = environment.API_URL + "/api/users/addfriend"
  urlShowFriends = environment.API_URL + "/api/users/friends"

  urlDB = "http://localhost:3000/api/users"
  dataUser!: any;
  urlPostMsg = environment.API_URL + "/api/messages/addfriendmessage"
  constructor(private _http: HttpClient) { }


  // ? les observables sont un support pour faire passer des données
  // ? entre les différents composants de notre application
  postUser(dataUser: any): Observable<any> {
    return this._http.post(this.urlDB + "/register", dataUser);
  }

  postUserLogin(dataUser: any): Observable<any> {
    return this._http.post(this.urlDB + "/login", dataUser);
  }



  //TODO: on rajoute un headers avec HttpHeaders()
  // methode qui permet de récupérer le profil de l'utilisateur en cours
  getProfile(): Observable<any> {
    // .append() pour ajouter
    //! let headerToken = new HttpHeaders().append('Authorization', `Bearer ${this.getToken()}`)

    let headerToken = new HttpHeaders().append('Authorization', `Bearer ${BackendService.getToken()}`)
    // TODO: Obligation de mettre un paramètre ds get()
    // TODO: on rajoute un objet { headers: headers crée au dessus }
    return this._http.get(this.urlDB + "/profile", { headers: headerToken })
    // on rajoute la route qui correspond ds api +"/list"
  }


  // on implémente une méthode qui permet de re récupérer le token via le register
  // méthode statique car ne prend pas de params ne change pas
  static getToken(): string | null {
    return localStorage.getItem('token')
  }




  register(registerValues: User): Observable<any> {
    return this._http.post(`${this.apiUrl}/register`, registerValues, { observe: 'response' });
  }

  login(loginValues: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, loginValues, { observe: 'response' });
  }

  getProfileApi(): Observable<any> {
    return this._http.get(`${this.apiUrl}/profile`, { observe: 'response' })
  }

  getUsersList(): Observable<any> {
    return this._http.get(`${this.apiUrl}/list`, { observe: 'response' })
  }


  addFriend(user: any): Observable<any> {
    // 1er param URL, 2e param un objet dans lequel il y a friendname
    return this._http.post(this.urlAdd, { friendName: user.username })
  }

  getFriendList(): Observable<any> {
    return this._http.get(`${this.urlShowFriends}`)

  }

  sendMessage(msg: any): Observable<any> {
    return this._http.post(`${this.urlPostMsg}`, { headers: 'token' })
  }
}
