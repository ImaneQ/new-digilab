import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls: ['./user-logged.component.css']
})
export class UserLoggedComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dataUser: any,
    private _dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    console.warn('données reçues pour modale',this.dataUser);

  }

  onClick() {
    this._dialogRef.close()
    console.log(this.dataUser);

  }

}
