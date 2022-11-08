import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';

import { ChatService } from '../../service/chat.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Injectable({ providedIn: 'root' })

export class UserResolver implements Resolve<User[]> {
constructor(private _userService: UserService){}

  // on garde tout sous forme d'observable car + simple
  resolve(route: ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<User[]>{
    return this._userService.getCurrentUser();
    // return from([])
  }
}


//! rappel interface:
//! classe implemente une interface la classe est
//!  obligée de redefinir ou de reimplementer tout ce qu'il ya ds
//! classe attributs et methodes
// class resolver implemente interface resolve
// *ng g resolver name
// type de l'attribut route: ActivatedRouteSnapshot
// type de state: RouterStateSnapshot
// annuler souscriptions : switchMap()
// concatMap(): assembler plusieurs tableaux ds l'ordre
