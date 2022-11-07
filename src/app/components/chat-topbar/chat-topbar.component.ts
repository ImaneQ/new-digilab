import { Component, Input, OnInit } from '@angular/core';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat-topbar',
  templateUrl: './chat-topbar.component.html',
  styleUrls: ['./chat-topbar.component.css']
})
export class ChatTopbarComponent implements OnInit {
  @Input() datas!: any

  constructor() { }

  ngOnInit(): void {

  }
}
