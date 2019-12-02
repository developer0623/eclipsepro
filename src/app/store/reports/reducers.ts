import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as _ from 'lodash';
import { collectionReducer } from '../subscriptions/reducer.ctors';

import { IProductionSummaryReportRecord } from 'app/models/dto';

export interface State {
  ProductionSummaryReport: IProductionSummaryReportRecord[];
}

const reducers: ActionReducerMap<State> = {
  ProductionSummaryReport: collectionReducer<IProductionSummaryReportRecord>('ProductionSummaryReport'),
};

export const reducer = combineReducers(reducers);
