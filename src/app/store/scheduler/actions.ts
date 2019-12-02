import { Action } from '@ngrx/store';

export const INITIALIZE_MODULE_ORDER = 'INITIALIZE_MODULE_ORDER';
export const INITIALIZE_AVAILABLEJOBS_COLUMNS = 'INITIALIZE_AVAILABLEJOBS_COLUMNS';
export const GET_SCHEDULE_DATA = 'GET_SCHEDULE_DATA';
export const GET_DOWNTIME_DATA = 'GET_DOWNTIME_DATA';
export const ADD_DOWNTIME_DATA = 'ADD_DOWNTIME_DATA';
export const UPDATE_DOWNTIME_DATA = 'UPDATE_DOWNTIME_DATA';
export const DEL_DOWNTIME_DATA = 'DEL_DOWNTIME_DATA';

export const SCHEDULE_JOB_ACTION = '[SCHEDULE_JOB_ACTION]';
export const UNSCHEDULE_JOB_ACTION = '[UNSCHEDULE_JOB_ACTION]';
export const REORDER_SCHEDULE_JOB_ACTION = '[REORDER_SCHEDULE_JOB_ACTION]';

export const TOGGLE_AVAILABLE_COLUMN = '[TOGGLE_AVAILABLE_COLUMN]';
export const REORDER_AVAILABLE_COLUMN = '[REORDER_AVAILABLE_COLUMN]';
export const RESET_AVAILABLE_COLUMNS = '[RESET_AVAILABLE_COLUMNS]';

import { IScheduledDowntime } from 'app/models/dto';

export class InitializeModuleOrder implements Action {
      readonly type = INITIALIZE_MODULE_ORDER;
}

export class InitAvailableJobsColumns implements Action {
      readonly type = INITIALIZE_AVAILABLEJOBS_COLUMNS;
}

export class GetScheduleData implements Action {
      readonly type = GET_SCHEDULE_DATA;
      constructor(public payload: { machineNumber: number }) { }
}

export class GetDownTimeData implements Action {
  readonly type = GET_DOWNTIME_DATA;
}

export class ScheduleJobAction implements Action {
      readonly type = SCHEDULE_JOB_ACTION;
      constructor(
            public payload: {
                  availableJobIds: number[],
                  machineId: number,
                  preceedingJobId?: number,
                  requestedSequenceNumber?: number,
                  isOnMachine: boolean
            }
      ) {}
}
export class UnscheduleJobAction implements Action {
      readonly type = UNSCHEDULE_JOB_ACTION;
      constructor(public payload: {scheduledJobIds: number[], machineId: number}) {}
}

export class ReorderScheduleJobAction implements Action {
      readonly type = REORDER_SCHEDULE_JOB_ACTION;
      constructor(
            public payload: {
                  scheduledJobIds: number[],
                  requestedSequenceNumber?: number,
                  machineId: number,
                  isOnMachine: boolean
            }
      ) {}
}

export class AddDownTimeDataAction implements Action {
  readonly type = ADD_DOWNTIME_DATA;
  constructor(public payload: {downtime: IScheduledDowntime}) {}
}

export class UpdateDownTimeDataAction implements Action {
  readonly type = UPDATE_DOWNTIME_DATA;
  constructor(public payload: {downtime: IScheduledDowntime, id: any}) {}
}

export class DelDownTimeDataAction implements Action {
  readonly type = DEL_DOWNTIME_DATA;
  constructor(public payload: {id: any}) {}
}
export class ToggleAvailableJobColumnAction implements Action {
  readonly type = TOGGLE_AVAILABLE_COLUMN;
  constructor(public payload: { fieldName: string }) { }
}
export class ReorderAvailableColumn implements Action {
  readonly type = REORDER_AVAILABLE_COLUMN;
  constructor(public payload: { column: { fieldName: string }, position: number }) { }
}
export class ResetAvailableJobColumnsAction implements Action {
  readonly type = RESET_AVAILABLE_COLUMNS;
}

