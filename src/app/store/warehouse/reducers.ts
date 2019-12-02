import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as _ from 'lodash';
import { collectionReducer } from '../subscriptions/reducer.ctors';

import { IReasonCode, ITask, ILocation } from 'app/models/dto';

export interface State {
  ReasonCode: IReasonCode[];
  MaterialTask: ITask[];
  Location: ILocation[];
}

const reducers: ActionReducerMap<State> = {
  ReasonCode: collectionReducer<IReasonCode>('ReasonCode'),
  MaterialTask: collectionReducer<ITask>('MaterialTask'),
  Location: collectionReducer<ILocation>('Location')
};

export const reducer = combineReducers(reducers);
