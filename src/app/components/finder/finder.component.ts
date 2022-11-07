import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {

  searchBarjobs: FormControl<any> = new FormControl();
  jobsList: any = [];

  constructor() { }

  ngOnInit(): void {
    this.searchBarjobs.valueChanges.pipe(map((jobs: any) => {
      this.jobsList = jobs
    }))
  }

}
