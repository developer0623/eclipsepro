import { RootState } from '../root.reducers';
import { State } from './reducers';
import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

export const selectProductionExplorer = (state: RootState) => state.productionExplorer;

// TODO: I believe there is a combinator method for this already.
function _createSubselector<T>(selector: (state: State) => T) {
  return createSelector(selectProductionExplorer, selector);
}

export const selectExplorerData = _createSubselector(state => state.explorerData);
export const selectRange = _createSubselector(state => state.range);


