import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, RequiredValidator, Validators } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import { DatasService } from 'src/app/service/datas.service';
import { HttpResponse } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  // 1-on affiche formulaire myForm
  myForm!: FormGroup;
  title = 'directory-project';
  datas!: any;
  directories: any[] = [];
  constructor(private datasService: DatasService,
    // 2-on fait appel au constructeur du formulaire
    private _fb: FormBuilder,
    // on importe MatDialog
    // pour ouvrir modale matdialog
    private matDialog: MatDialog) { }


  ngOnInit(): void {

  }



  // Suite correction matDialog
  // addNewDir(): void {

  //  let modal = this.matDialog.afterAllClosed.open(nomDelaModale)
  // modal.afterClosed().subscribe((resultFromModal:any)=>{

  // });

  // }



  // méthode pour ouvrir la modal en cliquant sur button
  OpenForm() {
    const popup = this.matDialog.open(ModalComponent, {
      width: '30%',
      height: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '2000ms'
    })

    popup.afterClosed().subscribe((responseFromModal: any) => {
      console.log(responseFromModal);
      let data = responseFromModal.data
      // ... operateur spread transferer valeures d'un tableau à un autre, ou utiliser push()
      this.directories = [data, ...this.directories]
    })
    // close the modal and sending back data
    // this.dialogRef.close(response)
    // on met tjs data, ds data on y met un objet,
    // on le nomme comme on veut et on recupere nos données


    // }
    // openDialog() {
    //   this.matDialog.open(MatDialog, {
    //     data: {
    //       name: '',
    //     },
    //   });
    // }

    // fournir un objet a directory c reponse du
    // serveur et on affiche nom dossier avc icone

    // getData() {
    //   return this.dataService.putData(item).subscribe((datas: any) => {
    //     this.datas = HttpResponse
    //   });
    // }






  }

  // Suite correction du service

}
