import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from 'src/app/service/user.service';

@Injectable({
  providedIn: 'root'
})
// ? Class fille
export class GlobalHttpService {

  urlJokes = 'https://official-joke-api.appspot.com/random_ten';

  // protected pour utiliser partout uniquement à travers héritage
  constructor(protected http: HttpClient,
    protected userService: UserService) {
  }


  getProfileList(): string {
    return ''
  }


}
