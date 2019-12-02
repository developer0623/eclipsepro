import { Injectable } from '@angular/core';
import { Api } from 'app/providers/api';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root.reducers';
import { selectFeatureFlags } from 'app/store/settings/selectors';
import { PostFeatureFalgAction } from 'app/store/settings/actions';
@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  features$: Observable<object>;

  constructor(private api: Api, private store: Store<RootState>) {
    this.features$ = store.select(selectFeatureFlags);
  }

  getFeatureFlags() {
    return this.features$;
  }
  setFeature(feature: string, enabled: boolean) {
    this.store.dispatch(new PostFeatureFalgAction({feature, enabled}));
  }
}
