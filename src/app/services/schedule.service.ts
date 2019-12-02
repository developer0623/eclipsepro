import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, merge } from 'rxjs';
import { combineLatest, scan, map, filter, tap, mergeMap } from 'rxjs/operators';
import { RootState } from 'app/store/root.reducers';
import { selectMachines } from 'app/store/dashboard/selectors';
import {
  selectAvailableJobColumns,
  selectJobSummariesByMachine,
  selectAvailableJobs,
  selectScheduledJobs,
  AssignedJobsGridData,
  AvailableJobsGridData,
  selectOrdIdsOfVisibleJobs,
} from 'app/store/scheduler/selectors';
import {
  InitAvailableJobsColumns,
  GetScheduleData,
  ScheduleJobAction,
  UnscheduleJobAction,
  ReorderScheduleJobAction
} from 'app/store/scheduler/actions';
import { IMachine, IAvailableJobColumn, IAvailableJob, IJobSummary, ISchedule } from 'app/models/dto';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SubscriptionsService } from './subscriptions.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  machines$: Observable<IMachine[]>;
  availableJobColumns$: Observable<IAvailableJobColumn[]>;
  constructor(private store: Store<RootState>, private dataSubscriptions: SubscriptionsService) {
    this.machines$ = this.store.select(selectMachines);
    this.availableJobColumns$ = this.store.select(selectAvailableJobColumns);
    this.store.dispatch(new InitAvailableJobsColumns());
  }

  initScheduleData(machineId) {
    this.store.dispatch(new GetScheduleData(machineId));
  }

  moveFromAvaToSch(payload) {
    this.store.dispatch(new ScheduleJobAction({
      ...payload
    }));

  }

  moveFromSchToAva(payload) {
    this.store.dispatch(new UnscheduleJobAction({
      ...payload
    }));

  }

  moveFromSchToSch(payload) {
    this.store.dispatch(new ReorderScheduleJobAction({
      ...payload
    }));

  }

   private buildAvailableJobsTree(jobs: Array<(IAvailableJob & IJobSummary)>, jobsTitles: { fieldName: string; color: string }[]) {
      const [keyColumn, ...remainingColumns] = jobsTitles;

      // Each node will be rendered as a two column grid. We only need to specify the width (%) of the first
      // column. The second column gets all the rest of the space. Inside that second column will be a nested
      // two column grid. So, from left to right these column width percentages get *bigger* because the nested
      // grid has less columns than it's parent grid.
      const columnWidth = 100 / jobsTitles.length;

      // Round to two decimal places. Only because the original implementation did so.
      const width = Math.round(columnWidth * 100) / 100 + '%';

      return _(jobs)
         .groupBy(j => j[keyColumn.fieldName])
         .toPairs()
         .map(([key, jobs__]) => {
            const jobs_ = jobs__ as Array<(IAvailableJob & IJobSummary)>;
            return {
               key,
               jobs: jobs_,
               items: remainingColumns.length > 0 ? this.buildAvailableJobsTree(jobs_, remainingColumns) : [],
               ids: jobs_.map(j => j.ordId),
               id: key + ':',
               style: { width, background: keyColumn.color },
               // this might be better to come from the column definition
               sref: keyColumn.fieldName === 'orderCode'
                  ? 'app.orders.order({id:' + jobs_[0].ordId + '})'
                  : keyColumn.fieldName === 'materialCode'
                     ? 'app.inventory.coil-types.coil-type({id:"' + jobs_[0].materialCode + '"})'
                                    : '',
                  warning: keyColumn.fieldName === 'requiredDateDisplay' && jobs_[0].warningDueDate,
                  pastDue: keyColumn.fieldName === 'requiredDateDisplay' && jobs_[0].pastDueDate,
                  iconColor: 'red-fg',
                  warningText: 'Warning: Job is scheduled to be completed after due date!',
                  pastDueText: 'Job is late!'
            };
         })
         .sortBy(n => n.key)
         .value();
   }

   private groupWhile<T, TKey>(array: T[], keyselector: (T) => TKey) {
      return array.reduce((acc, cur) => {
         const key = keyselector(cur);

         if (acc.length > 0 && acc[acc.length - 1].key === key) {
            const end = acc[acc.length - 1];

            end.items.push(cur);

            acc.splice(acc.length - 1, 1, end);

            return acc;
         }
         return [...acc, { key, items: [cur] }];
      }, []);
   }

  selectAvailableJobsOldTree(machineId: number, jobFilter$: Observable<((IJobSummary) => boolean)>)
    : Observable<{ jobs: any[]; count: number }> {

    // Select the model
    const availableColumns$ = this.store.select(selectAvailableJobColumns);
    return this.store.select(AvailableJobsGridData(machineId))
        .pipe(
          combineLatest(jobFilter$, availableColumns$, (gridDataModel, jobFilter, columns) => {
            const checkedColumns = columns.filter(x => x.ischecked);
            const filteredJobs = gridDataModel.gridData.filter(jobFilter) as unknown as (IAvailableJob & IJobSummary)[];

            return { jobs: this.buildAvailableJobsTree(filteredJobs, checkedColumns), count: gridDataModel.totalJobsAvailable };
          })
        );

   }

   private buildScheduledJobsTree(jobs: Array<(IAvailableJob & IJobSummary)>, jobsTitles: { fieldName: string; color: string }[]) {
      const [keyColumn, ...remainingColumns] = jobsTitles;

      const groups = this.groupWhile(jobs, j => j[keyColumn.fieldName]);
      if (remainingColumns.length > 0) {
         return groups.map((grp, i) => {
            return {
               key: grp.key,
               jobs: grp.items,
               items: this.buildScheduledJobsTree(grp.items, remainingColumns),
               jobIds: grp.items.map(j => j.ordId),
               id: grp.key + ':' + i
            };
         });
      } else {
         return groups;
      }
   }


  distinctArray(obs: Observable<number[]>): Observable<number[]> {
    const seed = { next: [] as number[], buf: [] as number[] };
    const reducer = (acc, ids: number[]) => {
      const next = ids.filter(id => !acc.buf.includes(id));
      return { next, buf: [...next, ...acc.buf] };
    };
    return obs.pipe(
      scan(reducer, seed)
      , map(x => x.next)
      , filter(arr => arr.length > 0)
    );
  }


   takeSubscriptionsForMachine(machineId: number) {
      // Subscribe to available and scheduled jobs for this machine...
      const scheduled_ = this.dataSubscriptions
        .SubscribeScheduledJobsIn({ property: 'machineNumber', values: [machineId] });
      const available_ = this.dataSubscriptions
        .SubscribeAvailableJobsIn({ property: 'machineId', values: [machineId] });

      // ...and the job summaries for both of them.
     const serverSubs_ = this.distinctArray(this.store.select(selectOrdIdsOfVisibleJobs(machineId)))
       .pipe(
         mergeMap(ordIds => this.dataSubscriptions.SubscribeJobSummariesIn({ property: 'ordId', values: ordIds }))
       );

     return merge(scheduled_, available_, serverSubs_);
   }

  selectScheduledJobsOldTree(machineId: number)
    : Observable< {jobsOnMachine: any[]; normalAssignedJobs: any[]; machineJobsCount: number, totalCount: number; dates: any[]}> {

      // Build the model
      const scheduledJobsGridDataModel$ = this.store.select(AssignedJobsGridData(machineId));

    return scheduledJobsGridDataModel$.pipe(
      map(jobs => {

        const sortedJobs = _.orderBy(jobs.gridData, 'sequenceNum', 'asc');
        const jobsOnMachine = [];
        const normalAssignedJobs = [];
        const jobsDate = [];
        sortedJobs.forEach((job) => {
          const job_ = {
            ...job,
            pastDueDate: job.requiredDate && new Date(job.requiredDate) < new Date(Date.now()),
            iconColor: 'red-fg',
            warningText: 'Warning: Job is scheduled to be completed after due date!',
            pastDueText: 'Job is Late!',
          };
          if (job_.isOnMachine) {
            jobsOnMachine.push(job_);
          } else {
            normalAssignedJobs.push(job_);
          }
          jobsDate.push(job_.completionDate);
        });

        return {
          jobsOnMachine: this.buildScheduledJobsTree(jobsOnMachine, [
            { fieldName: 'toolingCode', color: 'rgb(236, 212, 129)' },
            { fieldName: 'materialCode', color: 'rgb(249, 181, 112)' },
            // using job id as the final column means there is exactly one job in the final items array
            { fieldName: 'id', color: 'rgb(249, 181, 112)' }
          ]),
          normalAssignedJobs: this.buildScheduledJobsTree(normalAssignedJobs, [
            { fieldName: 'toolingCode', color: 'rgb(236, 212, 129)' },
            { fieldName: 'materialCode', color: 'rgb(249, 181, 112)' },
            // using job id as the final column means there is exactly one job in the final items array
            { fieldName: 'id', color: 'rgb(249, 181, 112)' }
          ]),
          machineJobsCount: jobsOnMachine.length,
          totalCount: jobs.totalJobsAssigned,
          dates: jobsDate
        };
      })
    );
  }
}
