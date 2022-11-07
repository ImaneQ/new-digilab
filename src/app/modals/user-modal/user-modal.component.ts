import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  //! on récupère les datas envoyées par userComponent.ts avec l'@Inject (MDD)
  constructor(@Inject(MAT_DIALOG_DATA) public dataUser: any,
    private _dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    console.warn('les données recues par la modale', this.dataUser);

  }
  // on recoit les infos du User en question lors de la fermeture
  // "on" car event binding
  onClick() {
    // signifie qu'on veut discuter avec cette personne
    this._dialogRef.close(this.dataUser)
    console.log(this.dataUser);


  }

  onCancel() {
    this._dialogRef.close()
  }
}
