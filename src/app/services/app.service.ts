import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root.reducers';
import { InitializeMachines } from 'app/store/dashboard/actions';
import { GetFeatureFlagsAction } from 'app/store/settings/actions';
import { Api } from '../providers/api';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private store: Store<RootState>, private api: Api) {
    this.store.dispatch(new InitializeMachines());
    this.store.dispatch(new GetFeatureFlagsAction());
    this.api.postLogin('guest', '').subscribe((result: any) => {
      localStorage.setItem('authToken', result.token);
    });
  }
}
