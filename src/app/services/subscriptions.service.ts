import { FilterDef, Subscription } from 'app/store/subscriptions/objects';
import { AddSubscription, DelSubscription } from 'app/store/subscriptions/actions';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root.reducers';
import { Observable, never } from 'rxjs';
import { Fx, IJobSummary, IAvailableJob, ISchedule } from 'app/models/dto';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  constructor(private store: Store<RootState>) {}
  private TakeSubscription<T>(collection: string, filterDef: FilterDef<T>) {
     const subscription = new Subscription(collection, filterDef);

     this.store.dispatch(new AddSubscription(subscription));

    return never().pipe(
      finalize(() => this.store.dispatch(new DelSubscription(subscription)))
    );
  }
  public SubscribeJobSummariesIn(filter: { property: string, values: (string | number)[] }) {
    return this.TakeSubscription<IJobSummary>('JobSummary', new Fx.In(filter.property, filter.values));
  }
  public SubscribeAvailableJobsIn(filter: { property: string, values: (string | number)[] }) {
    return this.TakeSubscription<IAvailableJob>('AvailableJob', new Fx.In(filter.property, filter.values));
  }
  public SubscribeScheduledJobsIn(filter: { property: string, values: (string | number)[] }) {
    return this.TakeSubscription<ISchedule>('ScheduledJob', new Fx.In(filter.property, filter.values));
  }
}
