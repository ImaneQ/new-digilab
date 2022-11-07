import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // décorateur qui permet la modif du DOM
  // on déclare la propriété drawer

  @ViewChild('drawer', { static: false }) drawer: any;

  open = 'open'
  constructor(private route:Router) { }

  ngOnInit(): void {


  }




  toggle() {
    this.drawer.toggle()

  }
  goToChat() {
    this.route.navigate(['overview/chat'])
  }

}
