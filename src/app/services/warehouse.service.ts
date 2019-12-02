import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root.reducers';
import { InitializeModuleWarehouse } from 'app/store/warehouse/actions';
import {
  selectReasonCodes, selectLocations, selectTasks
} from 'app/store/warehouse/selectors';
import {
  DeleteReasonAction, AddReasonAction, AddLocationAction
} from 'app/store/warehouse/actions';
import { IReasonCode, ITask, ILocation } from 'app/models/dto';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  location$: Observable<ILocation[]>;
  reasonCodes$: Observable<IReasonCode[]>;
  tasks$: Observable<ITask[]>;

  constructor(private store: Store<RootState>) {
    store.dispatch(new InitializeModuleWarehouse());
    this.location$ = store.select(selectLocations);
    this.reasonCodes$ = store.select(selectReasonCodes);
    this.tasks$ = store.select(selectTasks);
  }

  deleteReason(id) {
    this.store.dispatch(new DeleteReasonAction(id));
  }

  addReason(reason) {
    this.store.dispatch(new AddReasonAction(reason));
  }

  addLocation(location) {
    this.store.dispatch(new AddLocationAction(location));
  }
}
