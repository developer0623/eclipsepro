import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Api } from 'app/providers/api';
import { Store } from '@ngrx/store';
import { RootState } from '../root.reducers';
import { InitializeModule, INITIALIZE_MODULE } from './actions';
import { tap, map } from 'rxjs/operators';
import { IAlert } from 'app/models/dto';
import { Observable } from 'rxjs';
import { Initialize, Put } from '../subscriptions/actions';

@Injectable()
export class Effects {
   constructor(private actions$: Actions, private api: Api, private store: Store<RootState>) { }

   @Effect()
   initModuleData$ = this.actions$
      .pipe(
         ofType<InitializeModule>(INITIALIZE_MODULE)
         , tap(_ => this.createSingletonCollectionPut<IAlert[]>('Alerts', this.api.getAlerts()))
      );

   createCollectionInit<T>(collection: string, init: Observable<T[]>) {
      return init.pipe(map(t => new Initialize<T>(collection, t)));
   }
   createSingletonCollectionPut<T>(collection: string, init: Observable<T>) {
      return init.pipe(map(t => new Put<T>(collection, t)));
   }
}
