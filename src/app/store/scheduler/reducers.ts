import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as _ from 'lodash';
import { collectionReducer, collectionReducerSingleton } from '../subscriptions/reducer.ctors';

import {
  SCHEDULE_JOB_ACTION,
  UNSCHEDULE_JOB_ACTION,
  REORDER_SCHEDULE_JOB_ACTION,
  TOGGLE_AVAILABLE_COLUMN,
  REORDER_AVAILABLE_COLUMN,
  RESET_AVAILABLE_COLUMNS
} from './actions';

import {
  ISchedule,
  IAvailableJob,
  IAvailableJobColumn,
  IJobSummary,
  IScheduledDowntime
} from 'app/models/dto';

const initialAvailableColumnState = [
   { fieldName: 'toolingCode', displayName: 'tooling', name: 'Tooling', ischecked: true, id: 1, color: 'rgb(236, 212, 129)' },
   { fieldName: 'materialCode', displayName: 'material', name: 'Material', ischecked: true, id: 2, color: 'rgb(249, 181, 112)' },
   {
      fieldName: 'requiredDateDisplay', displayName: 'requiredBy', name: 'Required By', ischecked: true, id: 3,
      color: 'rgb(186, 205, 113)'
   },
   { fieldName: 'orderCode', displayName: 'order', name: 'Order', ischecked: true, id: 4, color: 'rgb(186, 205, 113)' },
   { fieldName: 'customerName', displayName: 'customer', name: 'Customer', ischecked: true, id: 5, color: 'rgb(186, 205, 113)' },
   { fieldName: 'totalFt', displayName: 'length', name: 'Length', ischecked: true, id: 6, color: 'rgb(186, 205, 113)' },
   // {fieldName: 'jobStateId', name : 'State', ischecked : false, id: 8, color:"rgb(186, 205, 113)" },
   { fieldName: 'importedDate', displayName: 'imported', name: 'Imported', ischecked: false, id: 9, color: 'rgb(186, 205, 113)' },
   // {fieldName: 'totalFt', name : 'Production', ischecked : false, id: 10, color:"rgb(186, 205, 113)" },
   { fieldName: 'truckNumber', displayName: 'truck', name: 'Truck', ischecked: false, id: 11, color: 'rgb(186, 205, 113)' },
   { fieldName: 'materialColor', displayName: 'color', name: 'Color', ischecked: false, id: 12, color: 'rgb(249, 181, 112)' },
   { fieldName: 'materialGauge', displayName: 'gauge', name: 'Gauge', ischecked: false, id: 13, color: 'rgb(249, 181, 112)' },
   { fieldName: 'materialWidthIn', displayName: 'width', name: 'Width', ischecked: false, id: 14, color: 'rgb(249, 181, 112)' },
   {
      fieldName: 'longestLengthIn', displayName: 'longestPart', name: 'Longest Part', ischecked: false, id: 15,
      color: 'rgb(186, 205, 113)'
   },
   { fieldName: 'salesOrder', displayName: 'so', name: 'SO', ischecked: false, id: 16, color: 'rgb(186, 205, 113)' },
   { fieldName: 'user1', displayName: 'schedule_user1', name: 'User1', ischecked: false, id: 17, color: 'rgb(186, 205, 113)' },
   { fieldName: 'user2', displayName: 'schedule_user2', name: 'User2', ischecked: false, id: 18, color: 'rgb(186, 205, 113)' },
   { fieldName: 'user3', displayName: 'schedule_user3', name: 'User3', ischecked: false, id: 19, color: 'rgb(186, 205, 113)' },
   { fieldName: 'user4', displayName: 'schedule_user4', name: 'User4', ischecked: false, id: 20, color: 'rgb(186, 205, 113)' },
   { fieldName: 'user5', displayName: 'schedule_user5', name: 'User5', ischecked: false, id: 21, color: 'rgb(186, 205, 113)' }
];

function AvailableJobColumns(state, action: any) {
  switch (action.type) {
      case TOGGLE_AVAILABLE_COLUMN: {
          return state.map(column => {
              if (column.fieldName === action.payload.fieldName) {
                  return { ...column, ischecked: !column.ischecked };
              }
              return column;
          });
      }
      case REORDER_AVAILABLE_COLUMN: {
          state.map((item) => {
              if (item.fieldName === action.payload.column.fieldName) {
                  item.id = action.payload.position;
              } else if (item.id >= action.payload.position) {
                  item.id += 1;
              }
          });
          const newState = _.orderBy(state, 'id');

          return newState;

      }
      case RESET_AVAILABLE_COLUMNS: {
          return initialAvailableColumnState;
      }
      // Initializing these columns is a special case, because the server might return
      // and empty set. If we ever get an empty set, we simply use the initial values.
      // case INITIALIZE: {
      //     if (action.collection === 'AvailableJobColumns') {
      //         if (action.payload.length > 0)
      //             return action.payload;
      //         else return initialAvailableColumnState;
      //     }
      // }
  }

  return state;
}

function AvailableJobsLocalModificationsReducer(state: IAvailableJob[], action: any) {
  // switch (action.type) {
  //     case SCHEDULE_JOB_ACTION: {
  //         // Remove from available jobs
  //         return state.filter(avj =>
  //           !(_.includes(action.payload.availableJobIds, avj.ordId) && avj.machineId === action.payload.machineId)
  //         );
  //     }
  //     case UNSCHEDULE_JOB_ACTION: {
  //         // Add back to available jobs
  //         const newJobs = action.payload.scheduledJobIds.map(id => {
  //             return {
  //               id: `${action.payload.machineId}-${id}`,
  //               expectedRuntime: 0,
  //               warningDueDate: false,
  //               machineId: action.payload.machineId,
  //               jobId: id
  //             };
  //         });
  //         return _([...state, ...newJobs]).sortBy(j => j.id).value();
  //     }
  // }
  return state;
}

function ScheduledJobsLocalModificationsReducer(state: ISchedule[], action: any) {
  /*
  switch (action.type)  {
      case SCHEDULE_JOB_ACTION: {
          // add to schedule jobs
          let seqPos = action.payload.requestedSequenceNumber;
          if (!seqPos) {
              seqPos = Math.max(0, ...state.filter(s => s.machineId === action.payload.machineId).map(a => a.sequenceNum)) + 1;
          }
          const skipSeqLength = action.payload.availableJobIds.length;
          const newState = state.map(job => {
            const newJob = {...job};
              if (newJob.sequenceNum >= seqPos && newJob.machineId === action.payload.machineId) {
                newJob.sequenceNum += skipSeqLength;
              }
              return newJob;
          });

          const newJobs = action.payload.availableJobIds.map(id => {
              return {
                id: id.toString(),
                isOnMachine: action.payload.isOnMachine,
                jobId: id,
                machineId: action.payload.machineId,
                sequenceNum: seqPos++,
                warningDueDate: false,
                warningMaterial: false
              };
          });

          return [...newState, ...newJobs];
      }
      case UNSCHEDULE_JOB_ACTION: {
          // Remove from scheduled jobs
          let jobsToRemove = state.filter(sj => _.includes(action.payload.scheduledJobIds, sj.jobId));
          // mix of onMachine?
          const onMachineCounts = _.countBy(jobsToRemove, 'isOnMachine');
          // onMachineCounts is an object with one or two elements. If it has both true and false properties, we only take the false ones.
          if (_.has(onMachineCounts, 'true') && _.has(onMachineCounts, 'false')) {
              jobsToRemove = _.filter(jobsToRemove, j => !j.isOnMachine);
          }

          return state.filter(sj => !_.includes(jobsToRemove.map(j => j.jobId), sj.jobId));
      }
      case REORDER_SCHEDULE_JOB_ACTION: {

          const seqPos = action.payload.requestedSequenceNumber;
          const skipSeqLength = action.payload.scheduledJobIds.length;
          return state.map(job => {
              if (job.machineId === action.payload.machineId) {
                  const indexId = _.indexOf(action.payload.scheduledJobIds, job.jobId);
                  if (indexId > -1) {
                      return { ...job, sequenceNum: seqPos + indexId, isOnMachine: action.payload.isOnMachine };
                  } else if (job.sequenceNum >= seqPos) {
                      return { ...job, sequenceNum: job.sequenceNum + skipSeqLength };
                  }
              }
              return job;
          });
      }
  } */
  return state;
}
export interface State {
  AvailableJobColumns: IAvailableJobColumn[];
  JobSummary: IJobSummary[];
  ScheduledDowntime: IScheduledDowntime[];
  AvailableJob: IAvailableJob[];
  ScheduledJob: ISchedule[];
}

const reducers: ActionReducerMap<State> = {
  // AvailableJobColumns: collectionReducerSingleton<IAvailableJobColumn[]>(
  //     'AvailableJobColumns', initialAvailableColumnState),
  AvailableJobColumns: (() => {
    const reducer1 = collectionReducerSingleton<IAvailableJobColumn[]>('AvailableJobColumns', initialAvailableColumnState);
    const reducer2 = AvailableJobColumns;

    return (state, action) => {
      const statenew = reducer1(state, action);
      return reducer2(statenew, action);
    };
  })(),
  JobSummary: collectionReducer<IJobSummary>('JobSummary'),
  ScheduledDowntime: collectionReducer<IScheduledDowntime>('ScheduledDowntimeDefinition'),
  //  AvailableJob: collectionReducer<IAvailableJob>('AvailableJob'),
  AvailableJob: (() => {
    // Create two reducers in a closure so we have a single instance of each.

    // Create a regular old collectionReducer like all our other subscribed collections...
    const reducer1 = collectionReducer<IAvailableJob>('AvailableJob');
    // ...then tack on an extra reducer ('tack on' meaning simply chain these reducers together).
    const reducer2 = AvailableJobsLocalModificationsReducer;

    return (state, action) => {
      const statenew = reducer1(state, action);
      return reducer2(statenew, action);
    };
  })(),
  ScheduledJob: (() => {
    // Create two reducers in a closure so we have a single instance of each.

    // Create a regular old collectionReducer like all our other subscribed collections...
    const reducer1 = collectionReducer<ISchedule>('ScheduledJob');
    // ...then tack on an extra reducer ('tack on' meaning simply chain these reducers together).
    const reducer2 = ScheduledJobsLocalModificationsReducer;

    return (state, action) => {
      const statenew = reducer1(state, action);
      return reducer2(statenew, action);
    };
  })(),
  // ScheduledJob: collectionReducer<IScheduledJob>('ScheduledJob'),
};

export const reducer = combineReducers(reducers);
