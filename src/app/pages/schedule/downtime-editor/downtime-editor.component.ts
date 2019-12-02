import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DowntimeDataService } from 'app/services/downtime-data.service';
import { MachineService } from 'app/services/machine.service';
import { IScheduledDowntime, IMachine } from 'app/models/dto';
import { DowntimeDetailModalComponent } from './components/downtime-detail-modal/downtime-detail-modal.component';

@Component({
  selector: 'app-downtime-editor',
  templateUrl: './downtime-editor.component.html',
  styleUrls: ['./downtime-editor.component.scss']
})
export class DowntimeEditorComponent implements OnInit {
  downtimes: IScheduledDowntime[] = [];
  machines: IMachine[] = [];

  constructor(private downtimeDataService: DowntimeDataService,
    private dialog: MatDialog,
    private machineService: MachineService
  ) {
    this.machineService.getOriginMachines().subscribe((machines) => {
      this.machines = machines;
    });
  }

  ngOnInit() {
    this.downtimeDataService.downtime$.subscribe((xx) => {
      console.log('11111111----', xx);
      this.downtimes = xx;
    });
  }

  showDowntimeDetailsModal(downtime, showDelete) {
    let singleDowntimeData = {};
    if (showDelete) {
      singleDowntimeData = {...downtime};
    }

    const dialogRef = this.dialog.open(DowntimeDetailModalComponent, {
      panelClass: ['downtime-dialog', 'custom-dialog'],
      data: {
        singleDowntimeData,
        showDelete,
        machines: this.machines
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.data) {
        if (result.data.id) {
          this.downtimeDataService.updateDowntime(result.data);
        } else {
          this.downtimeDataService.addDowntime(result.data);
        }
      } else if (result.isDelete) {
        this.downtimeDataService.delDowntime(result.id);
      }
    });
  }

}
