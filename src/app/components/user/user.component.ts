import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  filter,
  map,
  startWith,
  take
} from 'rxjs/operators';

import { AddFriendComponent } from 'src/app/modal/add-friend/add-friend.component';
import { BackendService } from './../../service/backend.service';
import { ChatService } from 'src/app/service/chat.service';
import { MatBadgeModule } from '@angular/material/badge';
import { Socket } from 'ngx-socket-io';
import { UserModalComponent } from './../../modals/user-modal/user-modal.component';
import { UserService } from 'src/app/service/user.service';

UserService
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isChecked = true;
  // on initiliase searchbar de type formControl
  searchBar: FormControl = new FormControl();
  dataList: any = [];
  userForList!: any;
  userProfile!: any;
  newFriend!: any[];
  matBadge!: true;
  // attribut qu'on déclaré de type
  constructor(private _userService: UserService,
    private _backendService: BackendService,
    public dialog: MatDialog,
    private _socket: Socket,
    private _matDialog: MatDialog,
    private _chatService: ChatService
  ) { }

  ngOnInit(): void {


    this._backendService.getProfileApi().subscribe((response: any) => {
      this.userProfile = response.body
      console.warn('userProfile', this.userProfile);
    })



    //! valueChanges: reagit a chaque fois que je tape qqch
    this.searchBar.valueChanges.pipe((startWith('')),
    ).subscribe((userSearched: any) => {
      // on affecte un tableau à dataList
      this.dataList = this.dataList.filter((elem: any) => elem.first_name.toLowerCase().includes(userSearched)
      )
      console.log(this.dataList);

    })


    this._backendService.getUsersList().subscribe((val: any) => {
      console.warn(val);
      this.dataList = val.body


    })

    // on ne subscribe pas car ne retourne rien
    this._chatService.userConnected()

    this._chatService.userConnect().subscribe((users: any) => {
      console.log(this.dataList);
      console.log(users);

      this.dataList.forEach((ami: any) => {
        if ((users).includes(ami.username)) {

          ami.online = true
          console.warn('ami connecté', ami);

        }
      }
      )
      this.dataList.sort((a:any, b:any) => a.users.online > b.users ? 1 : -1)
    })
  }





  // ds le parent du user
  onOpenModal(userSelected: any): void {
    // on génère 2 components 1 qui ouvre modal et 1 component
    // on met mdoalC en question
    const modalRef = this.dialog.open(UserModalComponent, {
      // ** si on déclare pas "data" on ne transfère pas de donnéees à la modal
      data: userSelected
      //! données envoyées à userModalC =>
      // ! utiliser propriété data dans le 2e paramètre de ma méthode open()
    })
    // si il n'a pas de liens entre component on utlise un service ,
    //  sinon parent/enfant output, sionn inverse
    // apres fermeture je souscris aux infos de la modale
    modalRef.afterClosed().subscribe((responseFromModal: any) => {
      (responseFromModal)
      if (responseFromModal) {
        // methode SetCurrentUser() reagit uniquement au préalable si methode
        // getUserCurrent a été appelée au préalable
        this._userService.setCurrentUser(userSelected)
      }
    })
  }




  addFriends(user: any) {
    this._backendService.addFriend(user).subscribe((friend: any) => {
      friend = this.newFriend

      if (friend) {
        this.newFriend.push(user)
      }

      this._matDialog.open(AddFriendComponent,
        {
          width: '25vw', //sets width of dialog
          height: '40vh',
          enterAnimationDuration: '800ms',
          exitAnimationDuration: '800ms',
          data: friend
        })
      console.warn('mes amis', this.newFriend);
    })
  }

  getFriend() {

    this._backendService.getFriendList().subscribe((response: any) => {
      this.newFriend = response.body
    })

  }


}
