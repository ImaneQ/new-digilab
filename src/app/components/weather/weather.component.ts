import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormGroup,
  FormsModule,
  RequiredValidator,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DataService } from 'src/app/service/data.service';
import { HttpClient } from '@angular/common/http';
import { WeatherModalComponent } from './../../modals/weather-modal/weather-modal.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  meteo = {
    street: '11 rue paul Bert',
    city: 'Annemasse',
    zip: 74100,
    temperature: 20
    // result:
  }


  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {


  }
  // on doit generer une modale en dehors du component et on fait appel a matdialog dans le component
  // methode open pour ouvrir modale
  openNewAdress(): void {
    const dialogRef = this.matDialog.open(WeatherModalComponent,
      // toujours data qu'on ecrit car s'apelle tjs comme ca
      { data: this.meteo })
      dialogRef.afterClosed().subscribe((responseModal:any) =>{
        console.log(responseModal);

        this.meteo = responseModal
        const formInfos= responseModal.form
        this.meteo = formInfos
        this.meteo.temperature = responseModal.temperature

      })
  }
}



