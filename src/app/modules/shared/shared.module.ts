import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { AddFriendComponent } from '../../modal/add-friend/add-friend.component';
import { CommonModule } from '@angular/common';
import { FinderModalComponent } from '../../modals/finder-modal/finder-modal.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModalComponent } from './../../modals/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoggedComponent } from 'src/app/modals/user-logged/user-logged.component';
import { UserModalComponent } from '../../modals/user-modal/user-modal.component';
import { WeatherModalComponent } from './../../modals/weather-modal/weather-modal.component';

// ng g module modules/shared
// on met ds imports/exports  les modules dont on se sert ds login
@NgModule({
  declarations: [
    FinderModalComponent,
    ModalComponent,
    UserModalComponent,
    WeatherModalComponent,
    UserLoggedComponent,
    AddFriendComponent

  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    FinderModalComponent,
    ModalComponent,
    UserModalComponent,
    WeatherModalComponent,
    UserLoggedComponent,
    AddFriendComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class SharedModule { }
