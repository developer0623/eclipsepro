import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as _ from 'lodash';
import { collectionReducer, collectionReducerSingleton } from '../subscriptions/reducer.ctors';

import {  ICoilDto, IMaterialDto, IConsumptionHistory } from 'app/models/dto';


export interface State {
  Coil: ICoilDto[];
  CoilTypes: IMaterialDto[];
  ConsumptionHistory: IConsumptionHistory[];
}

const reducers: ActionReducerMap<State> = {
  Coil: collectionReducer<ICoilDto>('Coil'),
  CoilTypes: collectionReducer<IMaterialDto>('CoilTypes'),
  ConsumptionHistory: collectionReducer<IConsumptionHistory>('ConsumptionHistory')
};

export const reducer = combineReducers(reducers);
