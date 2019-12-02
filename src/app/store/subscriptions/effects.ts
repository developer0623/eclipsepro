import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  AddSubscription, DelSubscription, Chop,
  ADD_SUBSCRIPTION, DEL_SUBSCRIPTION, PUT, DEL, INITIALIZE, RESET, Initialize
} from './actions';
import * as Fx from './objects';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { Api } from '../../providers/api';
import { selectSignalRConnectionId } from '../signalr/selectors';
import { RootState } from '../root.reducers';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';
import { filter, flatMap } from 'rxjs/operators';
import { IJobSummary, ISchedule, IAvailableJob } from 'app/models/dto';
import { selectSubscriptionInstances } from './selectors';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private api: Api, private store: Store<RootState>) {}
  // TODO: Is it really a best practice to dispatch an action for no other reason than an api call?

  @Effect({ dispatch: false })
  addServerSubscription$ = this.actions$.pipe(
    ofType<AddSubscription<any>>(ADD_SUBSCRIPTION),
    combineLatest(this.store.select(selectSignalRConnectionId).pipe(filter(c => c.connected))),

    // Post the subscription to the server
    tap(([action, signalrClientId]) => {
          this.api.addSubscription(action.payload, signalrClientId.connectionId).subscribe();
    })
  );

  @Effect({ dispatch: true})
  fetchDataAsSubscriptionsAreAdded$ = this.actions$.pipe(
    ofType<AddSubscription<any>>(ADD_SUBSCRIPTION)
    , flatMap(action => {
      const subscription = action.payload;
      switch (subscription.collection) {
        case 'JobSummary':
          return this.api.getJobSummariesList(subscription.filterDef, { skip: 0, take: 1000 }).pipe(
            map(data => new Initialize<IJobSummary>(subscription.collection, data))
          );

        case 'ScheduledJob':
          return this.api.getScheduledJobs(subscription.filterDef, { skip: 0, take: 1000 }).pipe(
            map(data => new Initialize<ISchedule>(subscription.collection, data))
          );

        case 'AvailableJob':
          return this.api.getAvailableJobs(subscription.filterDef, { skip: 0, take: 1000 }).pipe(
            map(data => new Initialize<IAvailableJob>(subscription.collection, data))
          );
      }
      throw new Error('Unregistered collection '  + subscription.collection);
    })
  );

  @Effect({ dispatch: false })
  deleteServerSubscription$ = this.actions$.pipe(
    ofType<DelSubscription<any>>(DEL_SUBSCRIPTION),
    tap((action) => {
      this.api.deleteSubscription(action.payload);
    })
  );

  @Effect()
  chopStoreCollection$ = this.actions$.pipe(
    ofType<DelSubscription<any>>(DEL_SUBSCRIPTION),
    map((x: DelSubscription<any>) => x.payload),
    withLatestFrom(
      this.store.select(selectSubscriptionInstances),
      (deletedSub, currentSubs) => {
        const chopSubs = currentSubs
          .filter(s => s.collection === deletedSub.collection)
          .filter(s => s.id !== deletedSub.id);
        return new Chop(deletedSub.collection, chopSubs);
    })
  );
}
