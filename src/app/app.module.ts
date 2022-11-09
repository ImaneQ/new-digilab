import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormGroupDirective,
  FormGroupName,
  FormsModule
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInput, MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AddFriendComponent } from './modal/add-friend/add-friend.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ChatComponent } from './components/chat/chat.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatTopbarComponent } from './components/chat-topbar/chat-topbar.component';
import { DirectoryComponent } from 'src/app/components/directory/directory.component';
import { FinderModalComponent } from './modals/finder-modal/finder-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModalComponent } from './modals/modal/modal.component';
import { NavbarComponent } from './components/overview/navbar/navbar.component';
import { PipesPipe } from 'src/app/pipe/pipes.pipe';
import { ProfilComponent } from './components/profil/profil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import { SideBarLeftComponent } from './components/overview/overview/side-bar-left/side-bar-left.component';
import { SideBarRightComponent } from './components/overview/side-bar-right/side-bar-right.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { TokenInterceptorProvider } from './helpers/token.interceptor';
import { UserComponent } from './components/user/user.component';
import { UserLoggedComponent } from './modals/user-logged/user-logged.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { UserResolver } from './components/resolvers/users.resolver';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherModalComponent } from './modals/weather-modal/weather-modal.component';
import { environment } from './../environments/environment.prod';

const config: SocketIoConfig = { url: `${environment.API_URL}`, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    UserComponent,
    PipesPipe,
    UserModalComponent,
    ModalComponent,
    DirectoryComponent,
    WeatherComponent,
    WeatherModalComponent,
    ChatComponent,
    ProfilComponent,
    SideBarLeftComponent,
    SideBarRightComponent,
    NavbarComponent,
    ChatRoomComponent,
    ChatTopbarComponent,
    FinderModalComponent,
    UserLoggedComponent,
    AddFriendComponent,


  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
    TextFieldModule,
    CdkAccordionModule,
    MatSnackBarModule,
    SocketIoModule,
    SocketIoModule.forRoot(config),
    MatSlideToggleModule,
    MatBadgeModule,
    SharedModule

  ],
  exports:[
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MatDialogRef, useValue: {} }, TokenInterceptorProvider,UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
