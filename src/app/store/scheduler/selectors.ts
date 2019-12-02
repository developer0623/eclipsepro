import { RootState } from '../root.reducers';
import { State } from './reducers';
import { createSelector } from '@ngrx/store';
import { selectMachines } from '../dashboard/selectors';
import * as moment from 'moment';

const selectSchedule = (state: RootState) => state.schedule;

// TODO: I believe there is a combinator method for this already.
function _createSubselector<T>(selector: (state: State) => T) {
   return createSelector(selectSchedule, selector);
}


export const selectAvailableJobs = _createSubselector(state => state.AvailableJob);
export const selectAvailableJobColumns = _createSubselector(state => state.AvailableJobColumns);
export const selectJobSummaries = _createSubselector(state => state.JobSummary);
export const selectScheduledDowntimes = _createSubselector(state => state.ScheduledDowntime);
export const selectScheduledJobs = _createSubselector(state => state.ScheduledJob);
export const selectDowntime = _createSubselector(state => state.ScheduledDowntime);

export const selectJobSummaryById = (id) => {
   return (state: RootState) => {
      return selectJobSummaries(state).find((job) => {
         return job.ordId === Number(id);
      });
   };
};

const _machineNumberMatch = (machineNumber: number) => (m: { machineNumber }) => m.machineNumber === machineNumber;
const _machineIdMatch = (machineId: number) => (m: { machineId }) => m.machineId === machineId;
const byMachineNumber = machineNumber => (hasMachineNumber: { machineId: number }) => hasMachineNumber.machineId === machineNumber;

export function selectSingleAvaliableJobs(machineNumber: number) {
   const byMachineNumber_ = _machineNumberMatch(machineNumber);
   const byMachineId = _machineIdMatch(0);
   return (state: RootState) => ({
      ajs: selectAvailableJobs(state).find(byMachineId),
      jss: selectJobSummaries(state).find(byMachineNumber_),
   });
}

export function selectSingleSchduleJobs(machineNumber: number) {
   const byMachineNumber_ = _machineNumberMatch(machineNumber);
   const byMachineId = _machineIdMatch(machineNumber);
   return (state: RootState) => ({
      ajs: selectAvailableJobs(state).find(byMachineId),
      jss: selectJobSummaries(state).find(byMachineNumber_),
   });
}

export const selectJobSummariesByMachine = (id) => {
   return (state: RootState) => {
      return selectJobSummaries(state).filter((job) => job.machineNumber === id);
   };
};

export const selectDownTimesMachines = () => {
  return (state: RootState) => ({
     machines: selectMachines(state),
     downtimes: selectDowntime(state)
  });
};

export const selectAvailableJobsForMachine = machineNumber => state =>
   selectAvailableJobs(state).filter(byMachineNumber(machineNumber));
const selectScheduledJobsForMachine = machineNumber => state =>
   selectScheduledJobs(state).filter(_machineNumberMatch(machineNumber));

export const selectOrdIdsOfVisibleJobs = machineNumber => _createSubselector(state => {
   return [
      ...state.AvailableJob.map(x => x.ordId),
      ...state.ScheduledJob.map(x => x.sequence.map(y => y.ordId)).reduce((acc, arr) => [...acc, ...arr], [])];
});

// const Machines = store => store.Machines;
// const AvailableJobColumnsSelector = store => store.AvailableJobColumns;
// const ScheduledJobs = store => store.Schedule as ISchedule[]
// const AvailableJobs = store => store.AvailableJob as Sch.AvailableJob[]
// const JobSummaries = store => store.JobSummary as IJobSummaryDto[]

export const AssignedJobsGridData = machineNumber => state => {
   const jobSummaries = selectJobSummaries(state);
   const schedule = selectScheduledJobs(state)
      .find(s => s.machineNumber === machineNumber);

   const scheduledJobs = !schedule ? [] : schedule.sequence;

   const gridData = scheduledJobs
      // These next two lines implement an inner join.
      .map(sj => ({ sj, js: jobSummaries.find(js => js.ordId === sj.ordId) }))
      .filter(x => x.js)
      // How do I make this automatically be of type (ISchedule & IJobSummaryDto)?
      .map(x => ({ ...x.sj, ...x.js, completePct: x.js.completeFt / x.js.totalFt }));

   return { gridData: gridData, totalJobsAssigned: scheduledJobs.length };
};

export const AvailableJobsGridData = machineId => state => {
   const jobSummaries = selectJobSummaries(state);
   const availableJobs = selectAvailableJobs(state)
      .filter(sj => sj.machineId === machineId);
   const gridData = availableJobs
      // These next two lines implement an inner join.
      .map(sj => ({ sj, js: jobSummaries.find(js => js.ordId === sj.ordId) }))
      .filter(x => x.js)
      // How do I make this automatically be of type (Sch.AvailableJob & IJobSummaryDto)?
      .map(x => ({
         ...x.sj,
         ...x.js,
         totalFt: Math.round(x.js.totalFt),
         requiredDateDisplay: x.js.requiredDate ? moment(x.js.requiredDate).format('YYYY-MM-DD') : '<none>'
      }));
   return { gridData, totalJobsAvailable: availableJobs.length };
};
