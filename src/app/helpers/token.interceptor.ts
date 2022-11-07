import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { BackendService } from '../service/backend.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  urlDB = environment.API_URL

  constructor(private _backendService: BackendService,
    private _snackBar: MatSnackBar) { }

  // provider: celui qui permet de faire des injections(http:HttpClient)
  // méthode intercept() qui reçoit requête  HttpRequest<unknown> + gestionnaire de requête  HttpHandler
  // ! INTERCEPTOR: tout le temps actif
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // on affiche requête de base
    console.log(request);
    // si on a un token on modifie
    const token = BackendService.getToken()

    //si token à insérer ds le header est nul
    // request.url => url qu'on essaie d'atteindre
    // on utilise méthode includes(), pour comparer 2 strings, et on verifie si les 2 liens sont identiques
    if (request.url.includes(this.urlDB)) {
      // on peut clôner requête, seul moyen d'intercepter requete c'est de la cloner
      let clone = request.clone({
        // on veut modifier les entêtes, on insère bearer
        headers: request.headers.set('Authorization', 'bearer ' + token)
      })
      console.log(clone);
      // next param HTTPHANDLER pour faire suivre ce qu'on veut transférer avec handle(param à faire suivre)
      return next.handle(clone).pipe(
        //! opérateur RXJS CATCHERROR, s'il y a une erreur qui retourne une observable
        // opérateur rxjs catchError() pour attraper les erreurs
        catchError((error: HttpErrorResponse) => {

          let message = ''
          switch (error.status) {

            case 400: message = "Bad request"
              break;
            case 401:
              message = "Unauthorized"
              break;
            case 400:
              message = "Bad request"
              break;

          }
          // snack-bar pour afficher le message d'erreur
          this._snackBar.open(message, 'Ok', { verticalPosition: 'top' })
          return next.handle(clone)

        })

      )
    }
    // sinon on envoie requête ss modif
    return next.handle(request);

  }
}

// on construit Provider
export const TokenInterceptorProvider = {
  // importer HTTP_INTERCEPTORS
  provide: HTTP_INTERCEPTORS,
  // on exporte la class TokenInterceptor
  useClass: TokenInterceptor,
  // mise à disposition partout, on va ds app.module ds provider et on l'importe pour qu'il soit tout le temps actif
  multi: true
}
