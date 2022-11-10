import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { ChatComponent } from './../../components/chat/chat.component';
import { ChatRoomComponent } from 'src/app/components/chat-room/chat-room.component';
import { ChatTopbarComponent } from './../../components/chat-topbar/chat-topbar.component';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './../../components/directory/directory.component';
import { MatDividerModule } from '@angular/material/divider';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './../../components/user/user.component';
import { WeatherComponent } from './../../components/weather/weather.component';

@NgModule({
  declarations: [
    OverviewComponent,
    WeatherComponent,
    DirectoryComponent,
    ChatComponent,
    UserComponent,
    ChatRoomComponent,
    ChatTopbarComponent],

  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule,
    MatDividerModule
  ],
  exports: [
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class OverviewModule { }


//!transférer les components concernés de app.modules vers overview.module.ts ds declarations
//! transférer les modules concernés de app.modules vers shared.module.ts
//! dans les imports et les exports
//! mettre modales components vers exports
