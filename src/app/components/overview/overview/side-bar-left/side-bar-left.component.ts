import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-left',
  templateUrl: './side-bar-left.component.html',
  styleUrls: ['./side-bar-left.component.css']
})
export class SideBarLeftComponent implements OnInit {
  // décorateur qui permet la modif du DOM
  // on déclare la propriété drawer

  @ViewChild('drawer', { static: false }) drawer: any;

  open = 'open'
  constructor(private route: Router) { }

  ngOnInit(): void {
  }


  toggle() {
    this.drawer.toggle()

  }

  goToChat() {
    this.route.navigate(['overview/chat'])
  }

}
