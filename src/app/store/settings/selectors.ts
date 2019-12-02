import { RootState } from '../root.reducers';
import { State } from './reducers';
import { createSelector } from '@ngrx/store';

const selectSettings = (state: RootState) => state.settings;

// TODO: I believe there is a combinator method for this already.
function _createSubselector<T>(selector: (state: State) => T) {
  return createSelector(selectSettings, selector);
}

export const selectLanguage = _createSubselector(state => state.Language);
export const selectSystemPreferences = _createSubselector(state => state.SystemPreferences);
export const selectFeatureFlags = _createSubselector(state => state.FeatureFlags);
