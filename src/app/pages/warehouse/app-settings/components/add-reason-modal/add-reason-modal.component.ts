import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  codeSet: string;
  reason: string;
}

@Component({
  selector: 'app-add-reason-modal',
  templateUrl: './add-reason-modal.component.html',
  styleUrls: ['./add-reason-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddReasonModalComponent implements OnInit {
  errorList = [
    {key: 'NonpreferredReasons', displayName: 'Nonpreferred Reasons'},
    {key: 'OverrideReasons', displayName: 'Override Reasons'},
    {key: 'UnattainableReasons', displayName: 'Cannot Complete Reasons'},
  ];

  constructor(public dialogRef: MatDialogRef<AddReasonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onModalClose(): void {
    this.dialogRef.close();
  }

}
