import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { BackendService } from './../service/backend.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// ng g guard guards/auth
export class AuthorizationGuard implements CanActivate {


  constructor(private _backendService: BackendService,
    private _router: Router,
    private _snackBar: MatSnackBar) { }


  // on implémente la méthode canActivate
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = BackendService.getToken();
    // UrlTree fait ref a une route , represente urlParsée, schémas des routes
    if (token) {
      return true;
    } else {
      this._snackBar.open('NOT FOUND', 'Ok')
      // on redirige le user vers un endroit, return une route
      return this._router.navigate(['login'])
    }
  }

}
