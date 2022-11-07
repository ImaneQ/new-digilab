import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  numberDate = new Date();
  // ici on définit un retour 'return' dans la methode car on return un 'number'
  transform(value: string): number | string {

    if (value) {
      let CurrentYear: any = new Date().getFullYear();
      let BirthYear: any = new Date(value).getFullYear();
      let userAge = CurrentYear - BirthYear;
      return userAge;
    }
    else {
      return ""
    }
  }

}


    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


