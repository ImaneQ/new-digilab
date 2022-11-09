import { FinderComponent } from './../../components/finder/finder.component';
import { FinderRoutingModule } from './finder-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FinderComponent],
  imports: [
    FinderRoutingModule,
    SharedModule
  ],
  exports:[
    SharedModule
  ]
})
export class FinderModule { }
