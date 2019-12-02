import { IAlert } from '../../models/dto';
import { combineReducers, ActionReducerMap } from '@ngrx/store';
import { collectionReducer, collectionReducerSingleton } from '../subscriptions/reducer.ctors';

export type State = IAlert[];

export const reducer = collectionReducerSingleton<IAlert[]>('Alerts', []);
