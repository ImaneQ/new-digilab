import { Component, OnInit } from '@angular/core';

import { ChatService } from './../../service/chat.service';
import { Chatmessage } from './../../models/chat';
import { DataService } from 'src/app/service/data.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  currentUser!: any;
  jokes: any = [];
  messageCtrl: FormControl = new FormControl();
  messages: any[] = [];
  date = new Date();
  chat = new Chatmessage();
  constructor(private _userService: UserService,
    private _dataService: DataService,
    private _chatService: ChatService,
    private _snackBar: MatSnackBar,
    private _socket: ChatService) { }



  ngOnInit(): void {
    this._userService.getCurrentUser().subscribe((user: any) => {
      console.log(user);
      this.currentUser = user

      // this._dataService.getJokes().subscribe((responseOfJokes: any) => {
      //   this.jokes = responseOfJokes;

      // })
      this._chatService.getAllMessage(this.currentUser.username)
        .pipe(map((objectReceived: any) => this.chat =
          objectReceived))
        .subscribe((objectReceived: any) => {
          this.messages = objectReceived
          console.log('test', objectReceived);

        })
    })
    console.warn('données envoyées depuis modale', this.currentUser);
    // on ecoute la connexion ne retourne RIEN
    this._chatService.firstConnexion()
    // on ecoute les msg envoyés ne retourne RIEN
    this._chatService.getMsgSent()
    // on ecoute les msg envoyés ne retourne RIEN
    this._chatService.getMsgOnline()


    this._chatService.receivedMessagesMethod().subscribe((msg: any) => {
      console.warn('getMessagesToSend', msg);
      // content/from
      this.messages.push(msg)

      if (this.currentUser.username !== msg.userID.username) {
        this._snackBar.open('Message from:' + msg.userID.username, '', { verticalPosition: 'top' })
      }
    })

    this._chatService.msgToReceive().subscribe((msgToConfirm: any) => {
      this.messages.push(msgToConfirm)
      console.log(msgToConfirm);


    })




  }

  onSubmit() {
    // on submit pour envoyer les msg et un argument attendu=> notre user
    // this.currentUser  nommé plus haut username

    this._chatService.sendMessage(this.currentUser.username, this.messageCtrl.value)
    this.messageCtrl.reset()

  }


}



