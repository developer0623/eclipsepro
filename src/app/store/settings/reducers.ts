import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as _ from 'lodash';
import { collectionReducer, collectionReducerSingleton } from '../subscriptions/reducer.ctors';

import {
  SET_LANGUAGES,
  SET_FEATURE_FLAGS
} from './actions';

import {
  ILanguage,
  ISystemPreferences
} from 'app/models/dto';

const initLanguages = [
  {
    'title'      : 'English',
    'translation': 'english',
    'code'       : 'en'
  },
  {
    'title'      : 'Deutsch',
    'translation': 'Deutsch',
    'code'       : 'de'
  }
];

function FeatureFlagReducer(state: object = {}, action: any) {
  switch (action.type) {
      case SET_FEATURE_FLAGS: return { ...state, ...action.payload};
  }
  return state;
}

export interface State {
  Language: ILanguage[];
  SystemPreferences: ISystemPreferences;
  FeatureFlags: object;
}

const reducers: ActionReducerMap<State> = {
  Language: collectionReducerSingleton<ILanguage[]>('Language', initLanguages),
  SystemPreferences: collectionReducerSingleton<ISystemPreferences>(
    'SystemPreferences', { systemLanguage: 'en', allowPrereleaseVersions: false, inchesUnit: 'in' }),
  FeatureFlags: FeatureFlagReducer
};

export const reducer = combineReducers(reducers);
