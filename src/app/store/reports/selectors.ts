import { RootState } from '../root.reducers';
import { State } from './reducers';
import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

const selectReports = (state: RootState) => state.reports;

// TODO: I believe there is a combinator method for this already.
function _createSubselector<T>(selector: (state: State) => T) {
  return createSelector(selectReports, selector);
}

export const selectProductionSummary = _createSubselector(state => state.ProductionSummaryReport);
