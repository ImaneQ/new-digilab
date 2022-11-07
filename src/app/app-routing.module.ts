import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from './Guards/authorization.guard';
import { ChatComponent } from './components/chat/chat.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatTopbarComponent } from './components/chat-topbar/chat-topbar.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { FinderComponent } from './components/finder/finder.component';
import { LoginComponent } from './component/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './component/register/register.component';
import { UserComponent } from './components/user/user.component';

// on met dans tableau routes les chemins,

const routes: Routes = [
  //  si path 'vide' => homepage
  // on en fait un vide pour la première page d'attérissage
  { path: '', component: LoginComponent },
  //  on met le chemin dans path:'chemin' puis le component qu'on veut atteindre dans component
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'overview', component: OverviewComponent,
    canActivate: [AuthorizationGuard],
    //  si on veut rajouter déclarer un autre tableau de routes,
    // on declare un attribut children, path ds path
    children:
      [{ path: 'directory', component: DirectoryComponent }, {
        path: 'finder', component: FinderComponent
      },
      {
        path: 'chat', component: ChatComponent,
        children:
          [{ path: 'user', component: UserComponent },
          {
            path: 'chat-room', component: ChatRoomComponent,
            children:
              [{ path: 'chat-topbar', component: ChatTopbarComponent }]
          }
          ]
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
