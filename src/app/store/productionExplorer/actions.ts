import { Action } from '@ngrx/store';
import { IDateRange } from 'app/models/dto';

export const ADD_EXPLORER_DATA = 'ADD_EXPLORER_DATA';
export const INIT_PRODUCTION_EXPLORER = 'INIT_PRODUCTION_EXPLORER';
export const SET_EXPLORER_AVAILABLE_DATE_RANGE = 'SET_EXPLORER_AVAILABLE_DATE_RANGE';
export const SET_EXPLORER_DATA_CURRENT_RANGE = 'SET_EXPLORER_DATA_CURRENT_RANGE';
export const INIT_EXPLORER_DATA = 'INIT_EXPLORER_DATA';

export class AddExplorerDataAction implements Action {
  readonly type = ADD_EXPLORER_DATA;
  constructor(public payload: any[]) {}
}

export class SetExplorerAvailableDateRangeAction implements Action {
  readonly type = SET_EXPLORER_AVAILABLE_DATE_RANGE;
  constructor(public payload: IDateRange) { }
}
export class InitProductionExplorerAction implements Action {
  readonly type = INIT_PRODUCTION_EXPLORER;
  constructor(public payload: { startDate: Date, endDate: Date }) {}
}

export class SetExplorerDataCurrentRangeAction implements Action {
  readonly type = SET_EXPLORER_DATA_CURRENT_RANGE;
  constructor(public payload: { startDate: Date, endDate: Date }) {}
}

export class InitExplorerDataAction implements Action {
  readonly type = INIT_EXPLORER_DATA;
  constructor() {}
}
