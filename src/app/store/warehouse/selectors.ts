import { RootState } from '../root.reducers';
import { State } from './reducers';
import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

const selectWarehouse = (state: RootState) => state.warehouse;

// TODO: I believe there is a combinator method for this already.
function _createSubselector<T>(selector: (state: State) => T) {
  return createSelector(selectWarehouse, selector);
}

export const selectLocations = _createSubselector(state => state.Location);
export const selectReasonCodes = _createSubselector(state => state.ReasonCode);
export const selectTasks = _createSubselector(state => state.MaterialTask);

export const selectTasksModel = _createSubselector(state => {
  const locations = state.Location;
  const reasons = state.ReasonCode;

  const tasksWithLocNames = state.MaterialTask.map(task => {
    const sourceLoc = locations.find(l => l.id === task.sourceLocationId) || { name: '<unknown>' };
    const destLoc = locations.find(l => l.id === task.destinationLocationId) || { name: '<unknown>' };
    if (task.overrideCode) {
      const overrideCodeReason = reasons.find(r => r.codeSet === task.overrideCode.codeSet && r.id === task.overrideCode.reason);
      if (overrideCodeReason) {
        task.overrideCode.reason = overrideCodeReason.reason;
      }
    }
    return { ...task, sourceLocation: sourceLoc.name, desinationLocation: destLoc.name };
  });

  const grouped = _.groupBy(tasksWithLocNames, t => t.taskState === 'Complete' ? 'Complete' : t.taskState === 'Ready' ? 'Ready' : 'Active');
  const readyTasks = grouped.Ready || [];
  const completedTasks = grouped.Complete || [];
  const activeTasks = grouped.Active || [];
  return {
    readyTasks: _.orderBy(readyTasks, ['requiredDate']).slice(0, 10),
    readyTasksRemaining: Math.max(readyTasks.length - 10, 0),
    completedTasks: _.orderBy(completedTasks, ['completedDate'], ['desc']).slice(0, 10),
    completedTasksRemaining: Math.max(completedTasks.length - 10, 0),
    activeTasks: _.orderBy(activeTasks, ['requiredDate']).slice(0, 10),
    activeTasksRemaining: Math.max(activeTasks.length - 10, 0)
  };
});

