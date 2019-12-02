
import { createSelector } from '@ngrx/store';
import { RootState } from '../root.reducers';
import { State } from './reducers';
import { All, Subscription } from '../subscriptions/objects';

const selectAlerts = (state: RootState) => state.alerts;

export function createAllAlertsSubscription() {
   const filter = new All();
   return new Subscription('Alerts', filter);
}
