import { Component, OnInit, NgModule, Injector, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { getMatFormFieldDuplicatedHintError, MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormArray, FormsModule, RequiredValidator, Validators, FormControlDirective } from '@angular/forms';
import { DatasService } from 'src/app/service/datas.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  myForm!: FormGroup;
  result: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    // donner des infos avec "ref" à la fin uniqut pour close(matDialogRef),
    //  matdialog pour open
    private Ref: MatDialogRef<ModalComponent>,
    // constructeur FormBuilder de formulaires
    private fb: FormBuilder,
    private _datasService: DatasService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.result = this.data;
    // a l'interieur des crochets tout ce qui est autorisé dans le champ indiqué >
    // Validators.pattern('/[\/\\a-zA-Z0-9&?-_.]/')=> https://regexr.com/ pour tester les patterns
    // on utilise méthode group()
    this.myForm = this.fb.group({
      name: ['',
        [Validators.required,
        Validators.minLength(3)]],
      path: ['',
      // @+   pour demander un arobas , {2,} min 2 car. de ce qu'il ya dans le tableau
        [Validators.required, Validators.pattern('[a-zA-Z0-9&?\-_.]{2,}@+')]],
      description: ['',
        [Validators.required,
        Validators.minLength(10)]]
    })
  }



  onSubmit() {
    console.log(this.myForm);
    // .value renvoie les valeurs insérées dans le champ
    const form = this.myForm.value;
    //  on appelle service on recupere datas du formulaire et on envoie
    this._datasService.postData(form).subscribe((response: any) => {
      console.log(response);
      // quand on ferme modale, (response) ce qu'on veut envoyer au component parent
      this.Ref.close(response)

    })


  }

  Closepopup() {
    // on prend this.Ref on lui fournit reponse du serveur
    this.Ref.close("Closing from function")
  }


}
