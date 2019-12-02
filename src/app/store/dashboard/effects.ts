import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Api } from '../../providers/api';
import {
   InitializeModule,
   INITIALIZE_MODULE,
   INITIALIZE_MACHINES,
   InitializeMachines,
   UPDATE_METRIC_SETTING,
   UpdateMetricSetting
} from './actions';
import { Observable } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../root.reducers';
import {
   IMachine, IMetricDefinition, IMachineState, IRollformingStatistics,
   IStatisticsHistory, IMachineMetricSettings, IScheduleSummary, IMachineSchedule,
} from 'app/models/dto';
import { Put, Initialize } from '../subscriptions/actions';
import { All } from '../subscriptions/objects';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private api: Api, private store: Store<RootState>) { }

  @Effect()
  initModuleData$ = this.actions$.pipe(
    ofType<InitializeModule>(INITIALIZE_MODULE),
    flatMap(_ => [
      this.createSingletonCollectionPut<IMetricDefinition[]>('MetricDefinition', this.api.getMetricDefinitions()),
      this.createCollectionInit<IMachineState>('MachineState', this.api.getMachineStateList()),
      this.createCollectionInit<IRollformingStatistics>('MachineStatistics', this.api.getMachineStatisticsCurrentShiftList()),
      this.createCollectionInit<IStatisticsHistory>('MachineStatisticsHistory', this.api.getMachineStatisticsHistoryList()),
      this.createCollectionInit<IMachineMetricSettings>('MachineMetricSettings', this.api.getMachineMetricSettingsList()),
      this.createCollectionInit<IScheduleSummary>('MachineScheduleSummary', this.api.getMachineScheduleSummaryList()),
      this.createCollectionInit<IMachineSchedule>('MachineSchedule', this.api.getMachineScheduleList(new All(), {skip: 0, take: 32})),
    ])
    , flatMap(x => x)
  );

  @Effect()
  initMachines$ = this.actions$.pipe(
    ofType<InitializeMachines>(INITIALIZE_MACHINES),
    flatMap(_ => [
      this.createCollectionInit<IMachine>('Machine', this.api.getMachineList()),
    ])
    , flatMap(x => x)
  );

  @Effect({dispatch: false})
  updateMetric$ = this.actions$.pipe(
    ofType<UpdateMetricSetting>(UPDATE_METRIC_SETTING),
    tap((initAction) => {
      const {metrics} = initAction.payload;
      this.api.putMachineMetricSettings(metrics.id, metrics.settings)
      .subscribe((results) => {
        // have to modify based on IMachineMetricSettings
        // console.log('putMachineMetricSettings', results);
        this.store.dispatch(new Put<IMachineMetricSettings>('MachineMetricSettings', metrics));
      });
    })
  );

  createCollectionInit<T>(collection: string, init: Observable<T[]>) {
    return init.pipe(map(t => new Initialize<T>(collection, t)));
  }
  createSingletonCollectionPut<T>(collection: string, init: Observable<T>) {
    return init.pipe(map(t => new Put<T>(collection, t)));
  }
}
