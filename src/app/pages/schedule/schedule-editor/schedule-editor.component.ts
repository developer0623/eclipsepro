import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ScheduleService } from 'app/services/schedule.service';
import { OrdersService } from 'app/services/orders.service';
import { IMachine } from 'app/models/dto';


@Component({
  selector: 'app-schedule-editor',
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.scss']
})
export class ScheduleEditorComponent implements OnInit {
  machines: IMachine[] = [];
  mainPath = '/schedule-editor';
  seletedMachineIndex = 0;
  selectedMachineId: number;
  constructor(
    private scheduleService: ScheduleService,
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const newId = params['machine'];
      if (newId) {
        this.selectedMachineId = Number(newId);
      }
    });

    this.scheduleService.machines$
     .pipe(
       tap(machines => {
         if (machines.length > 0) {
          this.machines = machines;
          const index = machines.findIndex((machine) => machine.id === this.selectedMachineId);
          this.seletedMachineIndex = index > -1 ? index : 0;
         }

       })
     ).subscribe();
  }

  onChangedTab(event) {
    this.seletedMachineIndex = event;
    this.selectedMachineId = this.machines[event].id;
    this.location.replaceState(this.mainPath, `machine=${this.selectedMachineId}`);
  }

}
