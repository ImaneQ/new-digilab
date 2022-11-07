import {
  Component,
  Inject,
  OnInit,
  Pipe
  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, take } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { observable, of } from 'rxjs';
import { WeatherService } from './../../service/weather-service';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.css']
})
export class WeatherModalComponent implements OnInit {
  // on initialise notre objet
  meteo = {
    street: '11 rue paul Bert',
    city: 'Annemasse',
    zip: '74100'
  }
  adressForm!: FormGroup;
  dataGps = { longitude: Number, latitude: Number }
  // pour recuperer infos du comonent parent on utilise @Inject
  // l'injection Token @Inject(MAT_)
  // datasFromModal
  constructor(@Inject(MAT_DIALOG_DATA) private datasFromModal: any,
    private matDialog: MatDialog,
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private matDialogRef: MatDialogRef<any>

  ) {
    console.log(this.datasFromModal)

  }

  ngOnInit(): void {
    this.adressForm = this.fb.group({
      street: [this.datasFromModal.street, [Validators.required]],
      city: [this.datasFromModal.city, [Validators.required]],
      zip: [this.datasFromModal.zip, [Validators.required]]

    })
    const form = this.adressForm.value;
    console.log(form);

    const locality = `${form.street}, ${form.city},${form.zip}`
    // this.weatherService.getCoordinates(locality,city,street)
  }

  onSubmit(): void {
    // on recupere les valeurs de l'input = .value
    const form = this.adressForm.value;
    // take() pour choisir un certain nombre d'éléments ici 1
    this.weatherService.getCoordinates(form.city, form.street, form.zip)
      // transformer valeurs qui arrivent de l'observable => pipe() meme pipe que symbole "|"
      //switchMap() => on renvoie une observable en fonction du resultat recu de la premiere Observable,
      //  on prends kles ifnos dont on a besoin et on retourne le 1er observable
      // pipe() operateur qui va me permettre de transofmrer flux de donnéesen fonction de l'obs. recue
      .pipe(take(1), switchMap((responseFromServerGps: any) => {
        const dataGps = {
          longitude: responseFromServerGps.features[0].geometry.coordinates[0],
          latitude: responseFromServerGps.features[0].geometry.coordinates[1]
        }
        // ! Return obligatoire dans switchMap() pour retourner la 2e Observable
        return this.weatherService.getWeather(dataGps.longitude, dataGps.latitude)
        // on subscribe à la réponse du server de weather, subscribe à la 2e observable
      })).subscribe((responseFromServerGps: any) => {
        let now = new Date();
        let heure = now.getHours();
        // en dessous chemin pour récupérer la valeure dans l'objet lors de la fermeture de la modal
        this.matDialogRef.close({ temperature: responseFromServerGps.hourly.temperature_2m[heure], form: form })

        // responseFromServerGps.hourly.time[heure],
        //   responseFromServerGps.hourly.time[heure])
  })

}


  // switchMap pour retourner une Observable
  // .close() transfert possible de données au component parent depuis la modal



// ! si pas d'observable  on met "from" ou "of" of emet les valeurs en 1 fois, et from 1 par 1
// **permettent de creer observable

}

