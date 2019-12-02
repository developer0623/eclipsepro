import { createSelector } from '@ngrx/store';
import { RootState } from '../root.reducers';
import { State } from './reducers';
import { In, Subscription } from '../subscriptions/objects';
import { IMachineSchedule, IScheduleEntry } from 'app/models/dto';
import * as _ from 'lodash';

const selectDashboard = (state: RootState) => state.dashboard;

// TODO: I believe there is a combinator method for this already.
function _createSubselector<T>(selector: (state: State) => T) {
   return createSelector(selectDashboard, selector);
}

const formatEstimateData = (estimate: IMachineSchedule): IMachineSchedule => {
   return {
      ...estimate,
      scheduleBlocks: estimate.scheduleBlocks.slice().sort((a, b) => {
         return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
      })
   };
};

export const selectMachines = _createSubselector(state => state.Machine);
export const selectSortedMachines = _createSubselector(state => _.sortBy(state.Machine, m => m.name));
export const selectMachineMetricSettings = _createSubselector(state => state.MachineMetricSettings);
export const selectMetricDefinition = _createSubselector(state => state.MetricDefinition);
const getMachineState = _createSubselector(state => state.MachineState);
const getMachineStatistics = _createSubselector(state => state.MachineStatistics);
const getMachineStatisticsHistory = _createSubselector(state => state.MachineStatisticsHistory);
const getMachineScheduleSummary = _createSubselector(state => state.MachineScheduleSummary);
const getMachineSchedules = _createSubselector(state => state.MachineSchedule);

const _machineNumberMatch = (machineNumber: number) => (m: { machineNumber: number }) => m.machineNumber === machineNumber;

export const selectMachineGridDashboardModel = (state: RootState) => {
   return selectMachines(state).map(machine => {
      const byMachineNumber = _machineNumberMatch(machine.machineNumber);
      return {
         machine,
         state: getMachineState(state).find(byMachineNumber),
         statistics: getMachineStatistics(state).find(byMachineNumber),
         metricDefinitions: selectMetricDefinition(state),
      };
   });
};

export function selectSingleMachineDashboardModel(machineNumber: number) {
   const byMachineNumber = _machineNumberMatch(machineNumber);
   return (state: RootState) => ({
      machine: selectMachines(state).find(byMachineNumber),
      state: getMachineState(state).find(byMachineNumber),
      metricSettings: selectMachineMetricSettings(state).find(byMachineNumber),
      metricDefinitions: selectMetricDefinition(state),
      statistics: getMachineStatistics(state).find(byMachineNumber),
      statisticsHistory: getMachineStatisticsHistory(state).find(byMachineNumber),
      scheduleSummary: getMachineScheduleSummary(state).find(byMachineNumber),
      schedule: getMachineSchedules(state).find(byMachineNumber),
   });
}

export function createCollectionByMachineNumberSubscription(collection: string, machineNumber: number) {
   const filter = new In('machineNumber', [machineNumber]);
   return new Subscription(collection, filter);
}

export function createSingleMachineDashboardModelSubscription(machineNumber: number) {
   return createCollectionByMachineNumberSubscription('Machine', machineNumber);
}

export const selectMachineGridTimeline = (state: RootState) => {
   return selectMachines(state).map(machine => {
      const byMachineNumber = _machineNumberMatch(machine.machineNumber);
      return {
         machine,
         state: getMachineState(state).find(byMachineNumber),
         statistics: getMachineStatistics(state).find(byMachineNumber),
         schedule: getMachineSchedules(state).map(formatEstimateData).find(byMachineNumber),
      };
   });
};
