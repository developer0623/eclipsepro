import { Action } from '@ngrx/store';
import { IReasonCode, ITask, ILocation } from 'app/models/dto';

export const INITIALIZE_MODULE_WAREHOUSE = 'INITIALIZE_MODULE_WAREHOUSE';
export const DELETE_REASON = 'DELETE_REASON';
export const ADD_REASON = 'ADD_REASON';
export const ADD_LOCATION = 'ADD_LOCATION';

export class InitializeModuleWarehouse implements Action {
  readonly type = INITIALIZE_MODULE_WAREHOUSE;
}

export class DeleteReasonAction {
  readonly type = DELETE_REASON;
  constructor(
        public payload: string
  ) { }
}

export class AddReasonAction {
  readonly type = ADD_REASON;
  constructor(
        public payload: any
  ) { }
}

export class AddLocationAction {
  readonly type = ADD_LOCATION;
  constructor(
        public payload: any
  ) { }
}
