import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { RootState } from 'app/store/root.reducers';
import { InitializeModule, UpdateMetricSetting } from 'app/store/dashboard/actions';
import {
  selectMachineGridDashboardModel, selectSingleMachineDashboardModel,
  selectMachineGridTimeline, selectMachines,
  selectMetricDefinition, selectMachineMetricSettings
} from 'app/store/dashboard/selectors';
import { IMachine, IMachineMetricSettings, IMetricDefinition, IMetricConfig  } from 'app/models/dto';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  machines$: Observable<{}[]>;
  constructor(private store: Store<RootState>) {
    store.dispatch(new InitializeModule());
    this.machines$ = store.select(selectMachineGridDashboardModel);
  }

  getMachineItem (machineNumber): Observable<any> {
    return this.store.select(selectSingleMachineDashboardModel(machineNumber));
  }

  getMchinesForTimeLine(): Observable<{}[]> {
    return this.store.select(selectMachineGridTimeline);
  }

  getOriginMachines(): Observable<IMachine[]> {
    return this.store.select(selectMachines);
  }

  getMetricDefinition(): Observable<IMetricDefinition[]> {
    return this.store.select(selectMetricDefinition);
  }

  getMachineMetricSettings(): Observable<IMachineMetricSettings[]> {
    return this.store.select(selectMachineMetricSettings);
  }

  updateMetric(metrics: IMachineMetricSettings) {
    this.store.dispatch(new UpdateMetricSetting({metrics}));
  }
}
