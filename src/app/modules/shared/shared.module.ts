import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

// ng g module modules/shared
// on met ds imports/exports  les modules dont on se sert ds login
@NgModule({
  declarations: [],
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

  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,

  ]
})
export class SharedModule { }