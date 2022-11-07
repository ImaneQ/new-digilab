import { BackendService } from './backend.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs/internal/Observable';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../models/user';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // subject car on envoie pas de donées par défaut(), donc constamment à l'écoute
  messagesToDisplay = new Subject<any>();
  receivedMessages = new Subject<any>();
  userSub = new Subject<any>();
  constructor(private _socket: Socket, private _http: HttpClient) { }


  firstConnexion() {
    this._socket.emit('login', { token: BackendService.getToken() });
  }

  // getMessage() {
  //   return this._socket.fromEvent('message').pipe(map((data: any) => data.msg));
  // }
  // on envoie un msg
  sendMessage(username: any, msg: string) {
    // on recupere contenu du msg ds : content: issu de l'api
    this._socket.emit('send friend message', { friendName: username, content: msg })

  }

  // msg envoyés

  // on voit le msg qu'on a envoyé on les recupere pour les afficher
  getMsgSent() {
    // on pour écouter les msg ds le salon ('friend message sent')
    this._socket.on('friend message sent', (messages: any) => {
      // on next les infos recues donc on créée un 2e subject pour pouvoir envoyer*
      //  les infos car pas le mm subject que messagesToDisplay
      console.log('confirmation msg envoyé', messages);

      this.receivedMessages.next(messages)
    })
  }

  //! on écoute constamment nos msg
  // 2e param de socket.on => callback

  getMsgOnline() {
    this._socket.on('friend message', (messages: string) => {
      console.warn('message recu lorsque je suis en ligne ', messages)
      this.sentMsgOnline(messages)
    })


  }
  //! observable, flux de données emis pdt un interval de temps
  //! on n'attend rien en retour car on va nexter on envoie seulement
  sentMsgOnline(messageToPass: string): void {
    this.messagesToDisplay.next(messageToPass)
  }
  // on dit que c'est une obs.
  receivedMessagesMethod(): Observable<any> {
    return this.messagesToDisplay.asObservable()
  }

  msgToReceive(): Observable<any> {
    return this.receivedMessages.asObservable()
  }


  // méthode qui retourne tous les msg reçus et envoyés
  getAllMessage(username: string): Observable<any> {
    return this._http.get(environment.API_URL + '/api/messages/friendmessages/' + username)
  }




  //! méthode de socket "on" ne retourne rien
  // users = données qu'on recoit du salon
  userConnected(): void {
    this._socket.on('users list', (users: any) => { this.userInsideUsers(users) })
  }

  userConnect(): Observable<any> {
    return this.userSub.asObservable()
  }

  userInsideUsers(usersLogged: any) {
    this.userSub.next(usersLogged)
  }
}
