import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Api } from '../../providers/api';
import {
   InitializeModuleOrder,
   INITIALIZE_MODULE_ORDER,
   InitAvailableJobsColumns,
   INITIALIZE_AVAILABLEJOBS_COLUMNS,
   GET_SCHEDULE_DATA,
   GetScheduleData,
   SCHEDULE_JOB_ACTION,
   ScheduleJobAction,
   UNSCHEDULE_JOB_ACTION,
   UnscheduleJobAction,
   REORDER_SCHEDULE_JOB_ACTION,
   ReorderScheduleJobAction,
   GET_DOWNTIME_DATA,
   GetDownTimeData,
   ADD_DOWNTIME_DATA,
   AddDownTimeDataAction,
   UPDATE_DOWNTIME_DATA,
   UpdateDownTimeDataAction,
   DEL_DOWNTIME_DATA,
   DelDownTimeDataAction
} from './actions';
import { Observable, pipe } from 'rxjs';
import { map, tap, flatMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../root.reducers';
import {
   ISchedule, IAvailableJob, IScheduledDowntime, IAvailableJobColumn, IJobSummary
} from 'app/models/dto';
import { Put, Initialize, DEL, Del } from '../subscriptions/actions';
import { All } from '../subscriptions/objects';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private api: Api, private store: Store<RootState>) { }

  // @Effect()
  // initModuleOrderData$ = this.actions$.pipe(
  //   ofType<InitializeModuleOrder>(INITIALIZE_MODULE_ORDER),
  //   flatMap(_ => [
  //     // this.createSingletonCollectionPut<IAvailableJobColumn[]>('AvailableJobColumn', this.api.getAvailableJobColumns()),
  //     this.createCollectionInit<IJobSummary>('JobSummary'
  //         , this.api.getJobSummariesList(new All(), {skip: 0, take: 1024}))
  //   ]),
  //   flatMap(x => x)
  // );

  @Effect()
  initAvailableJobColumn$ = this.actions$.pipe(
    ofType<InitAvailableJobsColumns>(INITIALIZE_AVAILABLEJOBS_COLUMNS),
    flatMap(_ => [
      this.createSingletonCollectionPut<IAvailableJobColumn[]>('AvailableJobColumn', this.api.getAvailableJobColumns())
    ]),
    flatMap(x => x)
  );

  @Effect()
  getDownTimeData$ = this.actions$.pipe(
    ofType<GetDownTimeData>(GET_DOWNTIME_DATA),
    flatMap(_ => [
      this.createCollectionInit<IScheduledDowntime>('ScheduledDowntimeDefinition',
        this.api.getScheduledDowntimeDefinitionsList())
    ]),
    flatMap(x => x)
  );

  @Effect({dispatch: false})
  scheduleJobAction$ = this.actions$.pipe(
    ofType<ScheduleJobAction>(SCHEDULE_JOB_ACTION),
    tap((initAction) => {
      const {availableJobIds, machineId, requestedSequenceNumber, isOnMachine} = initAction.payload;
      this.api.postScheduleAvailableJobs(machineId, availableJobIds, isOnMachine, requestedSequenceNumber)
      .subscribe((results) => {
          console.log('scheduleJobAction', results);
      });
    })
  );

  @Effect({dispatch: false})
  unScheduleJobAction$ = this.actions$.pipe(
    ofType<UnscheduleJobAction>(UNSCHEDULE_JOB_ACTION),
    tap((initAction) => {
      const {scheduledJobIds, machineId} = initAction.payload;
      this.api.postRemoveScheduledJobs(machineId, scheduledJobIds)
      .subscribe((results) => {
          console.log('unScheduleJobAction', results);
      });
    })
  );

  @Effect({dispatch: false})
  reScheduleJobAction$ = this.actions$.pipe(
    ofType<ReorderScheduleJobAction>(REORDER_SCHEDULE_JOB_ACTION),
    tap((initAction) => {
      const {scheduledJobIds, machineId, requestedSequenceNumber} = initAction.payload;
      this.api.postRescheduleJobs(machineId, scheduledJobIds, requestedSequenceNumber)
      .subscribe((results) => {
          console.log('ReorderScheduleJobAction', results);
      });
    })
  );

  @Effect()
  updateDownTime$ = this.actions$.pipe(
    ofType<UpdateDownTimeDataAction>(UPDATE_DOWNTIME_DATA),
    flatMap(initAction => [
      this.createSingletonCollectionPut<IScheduledDowntime>('ScheduledDowntimeDefinition',
        this.api.updateScheduledDowntimeDefinition(initAction.payload.id, initAction.payload.downtime))
    ]),
    flatMap(x => x)
  );
  @Effect()
  addDownTime$ = this.actions$.pipe(
    ofType<AddDownTimeDataAction>(ADD_DOWNTIME_DATA),
    flatMap(initAction => [
      this.createSingletonCollectionPut<IScheduledDowntime>('ScheduledDowntimeDefinition',
        this.api.addScheduledDowntimeDefinitions(initAction.payload.downtime))
    ]),
    flatMap(x => x)
  );

  @Effect({dispatch: false})
  deleteDownTime$ = this.actions$.pipe(
    ofType<DelDownTimeDataAction>(DEL_DOWNTIME_DATA),
    tap((initAction) => {
      const {id} = initAction.payload;
      this.api.deleteScheduledDowntimeDefinition(id)
      .subscribe((results) => {
        console.log('deleteScheduledDowntimeDefinition', results);
      });
    })
  );

  createCollectionInit<T>(collection: string, init: Observable<T[]>) {
    return init.pipe(map(t => new Initialize<T>(collection, t)));
  }
  createSingletonCollectionPut<T>(collection: string, init: Observable<T>) {
    return init.pipe(map(t => new Put<T>(collection, t)));
  }

  createSingletonCollectionDel<T>(collection: string, init: Observable<T>, id: string) {
    return init.pipe(map(t => new Del<T>(collection, id)));
  }
}
