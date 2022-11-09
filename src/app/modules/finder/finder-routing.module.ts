import { RouterModule, Routes } from '@angular/router';

import { FinderComponent } from './../../components/finder/finder.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path:'', component: FinderComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinderRoutingModule { }
