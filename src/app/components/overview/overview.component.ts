import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { BackendService } from './../../service/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter()

  constructor(private route: Router,
    private _backendService: BackendService) { }

  ngOnInit(): void {

    this._backendService.getProfileApi().subscribe((response: any) => {
      console.log(response.body);

    })
  }


  // ds Overview on met noscomponents avec sidebar
  public onToggleSidenav = () => {
    this.sidenavToggle.emit()
  }

  goToChat() {
    this.route.navigate(['overview/chat'])
  }


  goToDirectories() {
    this.route.navigate(['overview/directory'])
  }
}
