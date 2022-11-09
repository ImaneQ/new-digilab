import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { Socket } from 'ngx-socket-io';
import { User } from '../../models/user';
import { UserModalComponent } from './../../modals/user-modal/user-modal.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  profileParent!: User;
  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {

  }

  // notre param => user sur lequel on a cliqué
  openDialog(user: any) {
    // on envoie les infos à la modal
    this._dialog.open(UserModalComponent, {
      data: user
    })
  }

  play(value: User): void {
    this.profileParent = value
  }


}
