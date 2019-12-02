import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'app/store/root.reducers';
import { InitializeModuleOrder } from 'app/store/scheduler/actions';
import { selectJobSummaries, selectJobSummaryById } from 'app/store/scheduler/selectors';
import {IJobSummary} from 'app/models/dto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders$: Observable<IJobSummary[]>;

  constructor(private store: Store<RootState>) {
    this.store.dispatch(new InitializeModuleOrder());
    this.orders$ = this.store.select(selectJobSummaries);
  }

  getOrderItem (id): Observable<IJobSummary> {
    return this.store.select(selectJobSummaryById(id));
  }
}
