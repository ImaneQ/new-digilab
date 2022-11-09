import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './../../component/login/login.component';
import { NgModule } from '@angular/core';
// path avec string vide car path:'login' ds app-routing
const routes: Routes = [{path:'',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
