import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BackendService } from './../../service/backend.service';
import { DataService } from '../../service/data.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserLoggedComponent } from '../../modals/user-logged/user-logged.component';
import { UserModalComponent } from '../../modals/user-modal/user-modal.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  numberDate!: string;
  countries!: any;
  options!: string[];
  filteredOptions!: Observable<string[]>;
  // instancier class
  //myControl = new FormControl('');
  // qui contient toutes les infos du formulaire on le nomme
  // comme le formulaire
  userForm!: FormGroup;
  // on initialise un FormArray avec un tableau, on creer un nouveau tableau a chaque fois pour affecter chaque skill
  // skillsArray = new FormArray([new FormControl
  //   ('', Validators.required)]);
  //* on fait appel au modele User() on l'initialise
  user = new User();
  skillsArray: any;

  //   constructor(private dataService: DataService)
  // on appelle FormBuilder
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private _dataService: DataService,
    private dialog: MatDialog,
    private route: Router,
    private snack_bar: MatSnackBar,
    private _backendService: BackendService,
    private _matDialog: MatDialog,
    private _dialogRef: MatDialogRef<any>
  ) { }



  ngOnInit(): void {
    this._dataService.getCountries().subscribe((datasCountries: any) => {
      this.countries = datasCountries;
      // on affecte une valeur une fois que les resultats sont arrivés
      this.options = this.sortCountries();


    });

    // this.filteredOptions = this.myControl.valueChanges.pipe(
    // startWith(''),
    // map((value: any) => this._filter(value || ''))
    // ).subscribe()

    // !! ON SUBSCRIBE TOUJOURS MEME LORSQU'ON UTILISE LE PIPE

    // TODO: fb form builder constructeur de formulaires
    this.userForm = this.fb.group({
      firstName: [this.user.firstName,
      Validators.required
        // Required:
        // pour utiliser des expressions régulières,
        // (avec un certain nb de caractères, ou avec '@'...)
      ],
      lastName: [this.user.lastName,
      Validators.required],
      //1er tableau on initialise la valeur 'vide',
      // 2e tableau ds un tableau pour validators
      email: [this.user.email, [
        Validators.email,
        Validators.minLength(8),
        Validators.required]
        // Required:
        // pour utiliser des expressions régulières,
        // (avec un certain nb de caractères, ou avec '@'...)
      ],
      username: [this.user.username],
      zipCode: [this.user.zipCode, Validators.required],
      street: [this.user.street, Validators.required],
      city: [this.user.city, Validators.required
      ],
      country: [this.user.country,
      Validators.required],
      // skillsArray: new FormArray([]),
      password: [this.user.password,
      Validators.required],
      confPassword: ['', Validators.required]
    })

    this.user.avatar = "data:image/jpeg;base64,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"
  }

  // type de retour string []
  sortCountries(): string[] {
    //on utilise la méthode .map() pour créer un tableau
    return this.countries.map((country: any) => {
      return country.name.common;
    })
  }


  // _méthode/attribut = privé
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options?.filter(option => option.toLowerCase().includes(filterValue));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our skill
    if (value) {
      // this.skills.push();
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // remove(skill: string): void {
  //   const index = this.skills.indexOf(skill);

  //   if (index >= 0) {
  //     this.skills.splice(index, 1);
  //   }
  // }

  // addSkill() {
  //   this.skills.push(new FormControl());
  // }
  // removeSkill(index: number) {
  //   this.skills.removeAt(index);
  // }

  // on met tjs "on" devant la méthode de l'event
  onSubmit() {
    console.log(this.userForm);
    const form = this.userForm.value



    // on récupère les valeures du formulaire const déclarée plus haut ds form

    const password = form.password
    const confirmPassword = form.confPassword
    if (password !== confirmPassword) {
      // this.snack_bar.open
      alert('password not ')
      return;
    }
    // todo: on affecte la class User() à un objet => assign(notre class(),param avec lequel on veut fusionner)
    this.user = Object.assign(this.user, form)

    this.user.phoneNumber = '';
    this.user.dialCode = '';

    //******/ on fait appel au service qui récupère les données depuis le lien du backend
    this._backendService.register(this.user).subscribe((postDatas: any) => {

      console.warn('postDatas', postDatas.body);
      console.log(postDatas.body.token);


      //*****/ on place dans le localstorage notre TOKEN avec la valeur 'token' grace à la méthode setItem()
      localStorage.setItem('token', postDatas.body.token)
      console.log(localStorage);



      //****/ on fait appel à la modale ds constructor grace à MatDialog + open(nom du componentModal)
      this._matDialog.open(UserLoggedComponent,
        {
          width: '25vw', //sets width of dialog
          height: '60vh',
          enterAnimationDuration: '800ms',
          exitAnimationDuration: '800ms',
          data: postDatas
        })
    })


  }


  addInputControl() {
    this.skillsArray.push(new FormControl
      ('', Validators.required))
  }

  removeInputControl(idx: number) {
    this.skillsArray.removeAt(idx);
  }
  // <--------correction méthode cours------------>

  get skills(): FormArray {
    return this.userForm.get("skills") as FormArray
  }

  // addSkill() {
  // on rajoute formcontrol au tableau skills
  //   const competence = new FormControl();
  // si on déclare pas de const on peut ecrire comme ci dessous
  // <----------------this.skills.push(new FormControl())------------>
  //   this.skills.push(competence);}



}

