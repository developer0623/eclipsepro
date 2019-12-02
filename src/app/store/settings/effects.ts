import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Api } from '../../providers/api';
import {
   GET_FEATURE_FLAGS,
   GetFeatureFlagsAction,
   SetFeatureFalgsAction,
   POST_FEATURE_FLAG,
   PostFeatureFalgAction
} from './actions';
import { Observable, pipe } from 'rxjs';
import { map, tap, flatMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../root.reducers';
import {
   ILanguage
} from 'app/models/dto';
import { Put, Initialize, DEL, Del } from '../subscriptions/actions';
import { All } from '../subscriptions/objects';

@Injectable()
export class Effects {
   constructor(private actions$: Actions, private api: Api, private store: Store<RootState>) { }

  @Effect({dispatch: false})
  getFeatureFlags$ = this.actions$.pipe(
    ofType<GetFeatureFlagsAction>(GET_FEATURE_FLAGS),
    tap(() => {
      this.api.getFeatures()
      .subscribe((results) => {
        this.store.dispatch(new SetFeatureFalgsAction(results));
      });
    })
  );

  @Effect({dispatch: false})
  postFeatureFlags$ = this.actions$.pipe(
    ofType<PostFeatureFalgAction>(POST_FEATURE_FLAG),
    tap((initaction) => {
      this.api.postFeature(initaction.payload.feature, initaction.payload.enabled)
      .subscribe((results) => {
        this.store.dispatch(new SetFeatureFalgsAction(results));
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
