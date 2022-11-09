import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from 'src/app/components/chat/chat.component';
import { ChatRoomComponent } from 'src/app/components/chat-room/chat-room.component';
import { ChatTopbarComponent } from 'src/app/components/chat-topbar/chat-topbar.component';
import { DirectoryComponent } from 'src/app/components/directory/directory.component';
import { FinderComponent } from '../../components/finder/finder.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './../../components/overview/overview.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { UserResolver } from 'src/app/components/resolvers/users.resolver';
import { WeatherComponent } from 'src/app/components/weather/weather.component';

// on fait appel aux  routes
const routes: Routes = [{
  path: '', component: OverviewComponent, children:
    [{ path: 'directory', component: DirectoryComponent },
    { path: 'weather', component: WeatherComponent },

    // path: 'finder', loadChildren:()=> import('./modules/finder/finder.module').then(m=> m.FinderModule)}
    {
      path: 'chat', component: ChatComponent,
      children:
        [{
          path: 'user', component: UserComponent, resolve: {
            // propriété profile qu'on nomme comme on veut

            profile: UserResolver
          }
        },
        {
          path: 'chat-room', component: ChatRoomComponent,
          children:
            [{ path: 'chat-topbar', component: ChatTopbarComponent }]
        }]
    }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }


//!transférer les components concernés de app.modules vers overview.module.ts ds declarations
//! transférer les modules concernés de app.modules vers shared.module.ts
//! dans les imports et les exports
//! mettre modales components vers exports
