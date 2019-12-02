import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Api } from '../../providers/api';
import {
  InitializeModuleInventory,
  INITIALIZE_MODULE_INVENTORY
} from './actions';
import { Observable, pipe } from 'rxjs';
import { map, tap, flatMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../root.reducers';
import {
  ICoilDto,
  IMaterialDto,
  IConsumptionHistory,
  ILocation
} from 'app/models/dto';
import { Put, Initialize, DEL, Del } from '../subscriptions/actions';
import { All } from '../subscriptions/objects';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private api: Api, private store: Store<RootState>) { }

  @Effect()
  initModuleDataInventory$ = this.actions$.pipe(
    ofType<InitializeModuleInventory>(INITIALIZE_MODULE_INVENTORY),
    flatMap(_ => [
      this.createCollectionInit<ICoilDto>('Coil', this.api.getCoilList(new All(), {skip: 0, take: 1024})),
      this.createCollectionInit<IMaterialDto>('CoilTypes', this.api.getMaterialList(new All(), {skip: 0, take: 1024})),
      this.createCollectionInit<IConsumptionHistory>('ConsumptionHistory'
          , this.api.getConsumptionSummary(new All(), {skip: 0, take: 1024}))
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
