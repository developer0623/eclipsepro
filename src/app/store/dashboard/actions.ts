import { Action } from '@ngrx/store';
import { IMetricConfig, IMachineMetricSettings  } from 'app/models/dto';

export const INITIALIZE_MODULE = 'INITIALIZE_MODULE Dashboard';
export const INITIALIZE_MACHINES = 'INITIALIZE_MACHINES';
export const UPDATE_METRIC_SETTING = 'UPDATE_METRIC_SETTING';

export class InitializeModule implements Action {
      readonly type = INITIALIZE_MODULE;
}

export class InitializeMachines implements Action {
      readonly type = INITIALIZE_MACHINES;
}

export class UpdateMetricSetting {
  readonly type = UPDATE_METRIC_SETTING;
  constructor(
        public payload: {metrics: IMachineMetricSettings}
  ) { }
}
