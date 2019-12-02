
import { RootState } from '../root.reducers';
import { State } from './reducers';
import { createSelector } from '@ngrx/store';

export const selectSubscriptions = (state: RootState) => state.subscriptions;

export const selectSubscriptionInstances = createSelector(selectSubscriptions, subscriptionsState => subscriptionsState.Subscriptions);
