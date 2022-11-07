import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { BackendService } from '../../service/backend.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public friendAdded: any,
  // donner des infos avec "ref" à la fin uniqut pour close(matDialogRef),
  //  matdialog pour open
  private Ref: MatDialogRef<ModalComponent>,
  private _backendService:BackendService) { }

  ngOnInit(): void {
  }


}
