
import { collectionReducer, collectionReducerSingleton } from './reducer.ctors';
import { ADD_SUBSCRIPTION, DEL_SUBSCRIPTION, SubscriptionAction, ActionsUnion } from './actions';
import * as Fx from './objects';
import { ActionReducerMap, combineReducers } from '@ngrx/store';

function Subscriptions(state: Fx.Subscription<any>[] = [], action: SubscriptionAction<any>) {
   switch (action.type) {
      case ADD_SUBSCRIPTION: {
         return [...state, action.payload];
      }
      case DEL_SUBSCRIPTION: {
         return state.filter(s => s.id !== action.payload.id);
      }
   }
   return state;
}

export interface State {
   Subscriptions: Fx.Subscription<any>[];
}
export const reducers: ActionReducerMap<State> = {
   Subscriptions,
};


export const reducer = combineReducers(reducers);
