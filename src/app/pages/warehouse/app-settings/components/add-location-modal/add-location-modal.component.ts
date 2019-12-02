import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  category: string;
  name: string;
}

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddLocationModalComponent implements OnInit {
  categoryList = [
    {key: 'Warehouse', displayName: 'WAREHOUSE'},
    {key: 'StagingBay', displayName: 'STAGING BAY'},
    {key: 'Truck', displayName: 'TRUCK'},
    {key: 'LoadingDock', displayName: 'LOADING DOCK'},
  ];

  constructor(public dialogRef: MatDialogRef<AddLocationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onModalClose(): void {
    this.dialogRef.close();
  }

}
