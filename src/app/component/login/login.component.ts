import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { BackendService } from '../../service/backend.service';
import { DatasService } from '../../service/datas.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { splitNsName } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  userApi!: any;
  index: number = this.randomIndex()
  userForList!: any;
  user = new User();

  // ! On utilise .NEXT(données à envoyer) pour envoyer un flux de données
  //! et pour souscrire au flux de données via le component on utilise @Subject
  //! on initialise la class subject => userSubject = new Subject<any>();
  // ! subject attend le prochain flux de données
  //* userSubject = new BehaviourSubject([{}])
  //*  BehaviourSubj va avoir directement une valeure par défaut contrairement à Subject
  // opérateur Rxjs
  //* of() ne retourne rien, pour envoyer Observable vide


  // on fait appel au module Router
  constructor(private route: Router,
    private fb: FormBuilder,
    private _userService: UserService,
    private _backendService: BackendService) { }

  ngOnInit(): void {
    // ds ngoninit car on veut qu'il s'affiche directement
    this.loginForm = this.fb.group({
      // ! FormControl [property binding] ds le html + on déclare ici ds le TS en tant que FormControl
      // ! FormGroup =>  on utilise FormControlName="" ds le html, PAS de property bing
      email: new FormControl(['', Validators.required]),
      password: new FormControl(['', Validators.required])

    })
  }
  // méthode random pour récuperer un random 5 max 0 min
  randomIndex(): number {
    return Math.floor(Math.random() * (5 - 0)) + 0;

  }

  // on implémente une méthode au click pour rediriger vers la page 'overview' avec la méthode navigate()
  onSubmit() {

    const form = this.loginForm.value
    // on envoie this.user
    this.user = Object.assign(this.user, form)

    // service api pour recup avatar, on recupere les valeures que renvoie l'api
    this._backendService.login(this.user).subscribe((loginObject: any) => {
      console.log(loginObject.body);
      //***** 1) on post formulaire avc infos postUserLogin(infos)
      //***  2) si je recois token je le stock ds localstorage
      localStorage.setItem('token', loginObject.body.token)
      //** 3) ensuite je redirige user vrs overview
      this.route.navigate(['/overview'])




      // ******* ASYNCHRONE!! uniquement ds le subscribe qu'on peut utiliser
      // *** value car si on le fait en dehors ne va pas fonctionner

      // creer objet avec infos qui correspondent

      // const user = { mail: mailValue, password: password }
      // JSON.stringify(valeure qu'on veut rendre en string) méthode qui transforme en string
      // setItem(nom Qu'on veut mettre ds le localS, valeure )

      // const setUser = localStorage.setItem('user', JSON.stringify(user))

      // console.log(JSON.stringify(user));
      // console.log('local storage:', localStorage);

      // this._userService.postUser(user).subscribe(())


      // this._backendService.postUser(this.user).subscribe((response: any) => {
      //   console.log(response);
      //   response = this.user

      // })


      // todo ****ASYNCHRONE****(n'attend pas le resultat de chaque reponse du backend forcément)
      // todo  ==> on verifie si on est ok avec token et ensuite on redirige vers overview


    }

      // register/login/overvview(children (user,profil,chat,directory)
      // /chat/directory/profile


      // input.value

      //   public getData(user: string, password: string) {
      //     return localStorage.getItem(user, password)
      //   }

    )
  }

  goToRegister() {
    this.route.navigate(['/register'])
  }
}
