import { CommonModule } from '@angular/common';
import { LoginComponent } from './../../component/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  exports:[
    SharedModule
  ]
})
export class LoginModule { }


// on génère avec ng g module modules/login --route --routing (on rajoute --dry-run pour voir les elements ds console mais pas affichés  sur page )
