import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirectoryComponent } from 'src/app/components/directory/directory.component';


@Injectable({
  providedIn: 'root'
})
export class DatasService {


  urlApi = "https://reqres.in/api/users";

  constructor(private _http: HttpClient) { }

  postData(formUser: any): Observable<any> {

    return this._http.post(this.urlApi, {
      data: formUser
    })
  }

  // envoyer reponse du serveur de l'api
  // et injecter les reponse ds une modale avec angular material

  putData(dataForm: any): Observable<any> {

    return this.postData(dataForm)

  }
  // Correction service
  // postData(directoryForm: any): Observable<any> {
  //   return this._http.post('urlApi',{data:directory} )
  // }
}

