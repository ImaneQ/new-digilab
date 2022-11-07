import { BehaviorSubject, Observable, Subject, map, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApiUser } from './../models/response-api-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // /subject soit un Observable ou un Observeur qui envoie ou recoit des données
  currentUser = new Subject<any>()
  // propriété/attribut url
  // url = "https://reqres.in/api/users";
  // urlApi = "https://reqres.in/api/users";
  userApi!: string;
  urlRandom = "https://randomuser.me/api/";

  dataUserSubject = new BehaviorSubject<any>({})


  constructor(private http: HttpClient) { }




  // sendData(): Observable<any> {
  //   return this.http.get(this.url);
  // }

  // postData(formUser: any): Observable<any> {
  //   //post pour envoyer au propre
  //   return this.http.post(this.urlApi, {
  //     data: formUser
  //   });
  // }


  // * currentUser = new Subject<any>()

  // *  intermediaire qui peut faire un observable ou de sosucirre
  // *  il suffit d'envoyer données à toutes les personnes qui ont souscrit
  // *  ici chat room et chattopbar les 2 vont souscrire à cette Obs pour tjs avoir le nvl utilistaeur sélectionné

  //! et on recupere la valeure
  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable()

    // cette méthode permet de
    //! transformer l'attribut en observable
    // elle correspond à la valeure dans le setCurrentU() // this.currentUser.next(user)
  }

  //! on emet la val qu'on a récupéré ds le param:user
  setCurrentUser(user: any) {
    this.currentUser.next(user)
    //! NEXT() pour envoyer données a tous les components qui ont souscrit
    // via getUserC qui renvoie Obs.
  }
  // creer un nouveau service pour souscrire au nvl utilisateur on le recupere dans le chat room
  //* console.warn met en jaune les erreurs



  getUsers(): Observable<User[]> {
    //* on donne le type <ResponseApiUser> du get

    return this.http.get<ResponseApiUser>(this.userApi).pipe
      // qd on map sur la meme ligne retourne automatiqut
      //  sinon rajouter return par ligne
      (map((response: ResponseApiUser) => {
        return response.data
      }
      ))

  }


  // sendUser() {
  //   // on affecte le localstorage a une constante
  //   // on fait appel a un string donc 'user'
  //   const getUser = localStorage.getItem('user')
  //   // type peut etre NULL donc on demand SI il ya qqch dedans sinon on renvoie un Obs
  //   if (getUser) {

  //     // si on a qqch on JSON.parse() =>/* pour lavoir sous forme d'objet */

  //     const obj = JSON.parse(getUser)
  //     // on separe avec l'arobase
  //     const email = obj.email
  //     const first_name = obj.mail.split(/[@.]/)[0]
  //     const last_name = obj.mail.split(/[@.]/)[1]
  //     // TODO: (/[on exclut ces éléments]/) REGEX = expressions régulières
  //     const userObject = {
  //       first_name: first_name,
  //       last_name: last_name,
  //       avatar: obj.avatar,
  //       email: obj.mail
  //     }
  //     // next(données) a renvoyer
  //     this.dataUserSubject.next(userObject)
  //     return this.dataUserSubject.asObservable();

  //   } else {

  //     //! si observable ne renvoie rien on ne fait rien en mode OFF
  //     return of()
  //   }

  // }



}

// ! on doit obligatoirement unsubscribe() quand on souscrit à une OBSERVABLE pour éviter les pb de perfomances
// !on utilise le pipe async pour éviter
//* quand on déclare un Obs => obs$ = on met un dollar $
