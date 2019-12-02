import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Api } from '../../providers/api';
import {
  INIT_PRODUCTION_SUMMARY,
  InitProductionSummaryAction,
} from './actions';
import { Observable } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../root.reducers';
import { IProductionSummaryReportRecord } from 'app/models/dto';
import { Put, Initialize, Del } from '../subscriptions/actions';
import { All } from '../subscriptions/objects';

@Injectable()
export class Effects {
   constructor(private actions$: Actions, private api: Api, private store: Store<RootState>) { }

  // @Effect({dispatch: false})
  // initProductionSummary$ = this.actions$.pipe(
  //   ofType<InitProductionSummaryAction>(INIT_PRODUCTION_SUMMARY),
  //   tap((initAction) => {
  //     this.api.getProductionSummary(initAction.payload)
  //     .subscribe((results) => {
  //       // this.store.dispatch(new Del<IReasonCode>('ReasonCode', initAction.payload));
  //       console.log('results----', results);
  //     });
  //   })
  // );

  @Effect()
  initProductionSummary$ = this.actions$.pipe(
    ofType<InitProductionSummaryAction>(INIT_PRODUCTION_SUMMARY),
    flatMap(initAction => [
      this.createCollectionInit<IProductionSummaryReportRecord>(
        'ProductionSummaryReport', this.api.getProductionSummary(initAction.payload)
      )
    ])
    , flatMap(x => x)
  );

  createCollectionInit<T>(collection: string, init: Observable<T[]>) {
    return init.pipe(map(t => new Initialize<T>(collection, t)));
  }
  createSingletonCollectionPut<T>(collection: string, init: Observable<T>) {
    return init.pipe(map(t => new Put<T>(collection, t)));
  }

  createSingletonCollectionDel<T>(collection: string, init: Observable<T>, id: string) {
    return init.pipe(map(t => new Del<T>(collection, id)));
  }
}
