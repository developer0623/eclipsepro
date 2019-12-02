import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { RootState } from 'app/store/root.reducers';
import { GetDownTimeData, UpdateDownTimeDataAction, AddDownTimeDataAction, DelDownTimeDataAction } from 'app/store/scheduler/actions';
import { selectDownTimesMachines } from 'app/store/scheduler/selectors';
import { IScheduledDowntime } from 'app/models/dto';

@Injectable({
  providedIn: 'root'
})
export class DowntimeDataService {
  downtime$ = new Subject<IScheduledDowntime[]>();

  constructor(private store: Store<RootState>) {
    this.store.dispatch(new GetDownTimeData());
    this.store.select(selectDownTimesMachines()).pipe(
      filter((x: any) => x.machines.length > 0 && x.downtimes.length > 0 ),
      tap((x: any) => {
        const downtimes = x.downtimes.map(d => {
          return this.formatDowntime(d, x.machines);
        });
        this.downtime$.next(downtimes);
      }),
    ).subscribe();
  }

  formatDowntime(downtime, machineList) {
    const machines = [];
    downtime.machines.forEach((downtimeMachineId) => {
      if (machineList[downtimeMachineId]) {
        machines.push(machineList[downtimeMachineId].description);
      } else {
        machines.push('Machine ID ' + downtimeMachineId + ' (Error ID not valid!)');
      }
    });
    return {...downtime, machinesText: machines.join(', ')};
  }

  updateDowntime(downtime) {
    this.store.dispatch(new UpdateDownTimeDataAction({
      downtime, id: downtime.id
    }));
  }

  addDowntime(downtime) {
    this.store.dispatch(new AddDownTimeDataAction({downtime}));
  }

 delDowntime(id) {
    this.store.dispatch(new DelDownTimeDataAction({id}));
  }
}
