import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Api } from '../../providers/api';
import {
  INIT_PRODUCTION_EXPLORER,
  InitProductionExplorerAction,
  SET_EXPLORER_DATA_CURRENT_RANGE,
  SetExplorerDataCurrentRangeAction,
  InitExplorerDataAction,
  SetExplorerAvailableDateRangeAction,
  AddExplorerDataAction
} from './actions';

import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../root.reducers';
import { All } from '../subscriptions/objects';

@Injectable()
export class Effects {
   constructor(private actions$: Actions, private api: Api, private store: Store<RootState>) { }

  @Effect({dispatch: false})
  initData$ = this.actions$.pipe(
    ofType<InitProductionExplorerAction>(INIT_PRODUCTION_EXPLORER),
    tap((a) => {
      this.api.getProductionData(new All(), {skip: 0, take: 1024, startDate: a.payload.startDate, endDate: a.payload.endDate})
      .subscribe((data) => {
        this.store.dispatch(new AddExplorerDataAction(data));
      });

      this.api.getProductionRange()
      .subscribe((data: any) => {
        const range = {maxDate: new Date(data.maxDate), minDate: new Date(data.minDate)};
        this.store.dispatch(new SetExplorerAvailableDateRangeAction(range));
      });
    })
  );

  @Effect({dispatch: false})
  loadExplorerData$ = this.actions$.pipe(
    ofType<SetExplorerDataCurrentRangeAction>(SET_EXPLORER_DATA_CURRENT_RANGE),
    tap((a) => {
      this.store.dispatch(new InitExplorerDataAction());
      this.api.getProductionData(new All(), {skip: 0, take: 1024, startDate: a.payload.startDate, endDate: a.payload.endDate})
      .subscribe((data) => {
        this.store.dispatch(new AddExplorerDataAction(data));
      });
    })
  );
}
