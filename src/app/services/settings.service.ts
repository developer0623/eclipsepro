import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root.reducers';
import {
  ILanguage,
  ISystemPreferences
} from 'app/models/dto';

import {
  selectLanguage,
  selectSystemPreferences
} from 'app/store/settings/selectors';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  languages$: Observable<ILanguage[]>;
  preferences$: Observable<ISystemPreferences>;

  constructor(private store: Store<RootState>) {
    this.languages$ = store.select(selectLanguage);
    this.preferences$ = store.select(selectSystemPreferences);
  }
}
