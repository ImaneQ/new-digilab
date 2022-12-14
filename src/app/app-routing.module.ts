import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from './Guards/authorization.guard';
import { ChatComponent } from './components/chat/chat.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatTopbarComponent } from './components/chat-topbar/chat-topbar.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { FinderComponent } from './components/finder/finder.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RegisterComponent } from './component/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UserResolver } from './components/resolvers/users.resolver';
import { WeatherComponent } from './components/weather/weather.component';

// on met dans tableau routes les chemins,

const routes: Routes = [
  //  si path 'vide' => homepage
  // on en fait un vide pour la première page d'attérissage
  // { path: '', component: LoginComponent },
  //  on met le chemin dans path:'chemin' puis le component qu'on veut atteindre dans component
  { path: 'register',  loadChildren:()=> import('./modules/register/register.module').then(m=> m.RegisterModule) },
  { path: 'login', loadChildren:()=> import('./modules/login/login.module').then(m=> m.LoginModule) },
  // on supprime component: NomComponent car on va le rmettre ds login-routing-module ds routes
  {
    path: 'overview', loadChildren:()=> import('./modules/overview/overview.module').then(m=> m.OverviewModule),
    canActivate: [AuthorizationGuard],
    //  si on veut rajouter déclarer un autre tableau de routes,
    // on declare un attribut children, path ds path


      },
      {path: 'finder', loadChildren:()=> import('./modules/finder/finder.module').then(m=> m.FinderModule)}
      ]

//! a quoi servent ngModule()
//* -grouper des fonctionnalités en blocs
//* -préparer l'environnement pour les templates
//* -organiser les parties de l'application
//* -connecter app avec librairires externes
//* rassembler les composants et les re-exporter pour d'autres modules

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
