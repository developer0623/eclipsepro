import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Api } from '../../providers/api';
import {
  INITIALIZE_MODULE_WAREHOUSE,
  InitializeModuleWarehouse,
  DELETE_REASON, DeleteReasonAction,
  ADD_REASON, AddReasonAction,
  ADD_LOCATION, AddLocationAction
} from './actions';
import { Observable } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../root.reducers';
import { IReasonCode, ITask, ILocation } from 'app/models/dto';
import { Put, Initialize, Del } from '../subscriptions/actions';
import { All } from '../subscriptions/objects';

@Injectable()
export class Effects {
   constructor(private actions$: Actions, private api: Api, private store: Store<RootState>) { }

   @Effect()
  initModuleDataWAREHOUSE$ = this.actions$.pipe(
    ofType<InitializeModuleWarehouse>(INITIALIZE_MODULE_WAREHOUSE),
    flatMap(_ => [
      this.createCollectionInit<IReasonCode>('ReasonCode', this.api.getReasonCodes()),
      this.createCollectionInit<ITask>('MaterialTask', this.api.getTasks(new All(), {skip: 0, take: 1024})),
      this.createCollectionInit<ILocation>('Location', this.api.getLocations())
    ])
    , flatMap(x => x)
  );

  @Effect({dispatch: false})
  deleteReasonAction$ = this.actions$.pipe(
    ofType<DeleteReasonAction>(DELETE_REASON),
    tap((initAction) => {
      this.api.deleteReasdonCode(initAction.payload)
      .subscribe(() => {
        this.store.dispatch(new Del<IReasonCode>('ReasonCode', initAction.payload));
      });
    })
  );

  @Effect({dispatch: false})
  addReasonAction$ = this.actions$.pipe(
    ofType<AddReasonAction>(ADD_REASON),
    tap((initAction) => {
      this.api.postReasonCode(initAction.payload)
      .subscribe((result: IReasonCode) => {
        this.store.dispatch(new Put<IReasonCode>('ReasonCode', result));
      });
    })
  );

  @Effect({dispatch: false})
  addLocationAction$ = this.actions$.pipe(
    ofType<AddLocationAction>(ADD_LOCATION),
    tap((initAction) => {
      this.api.postLocation(initAction.payload)
      .subscribe((result: ILocation) => {
        console.log('result location', result);
        // this.store.dispatch(new Put<IReasonCode>('ReasonCode', result));
      });
    })
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
