import { Action } from '@ngrx/store';
import { IProductionSummaryReportRecord } from 'app/models/dto';

export const INIT_PRODUCTION_SUMMARY = 'INIT_PRODUCTION_SUMMARY';

export class InitProductionSummaryAction implements Action {
  readonly type = INIT_PRODUCTION_SUMMARY;
  constructor(
        public payload: any
  ) { }
}
