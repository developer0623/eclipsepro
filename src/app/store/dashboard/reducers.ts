import * as Documents from '../../models/dto';
import { combineReducers, ActionReducerMap } from '@ngrx/store';
import { collectionReducer, collectionReducerSingleton } from '../subscriptions/reducer.ctors';


export interface State {
    SystemInfo: any;
    UpdateInfo: any;
    SystemAgent: any;
    Machine: Documents.IMachine[];
    MetricDefinition: Documents.IMetricDefinition[];
    MachineState: Documents.IMachineState[];
    MachineStatistics: Documents.IRollformingStatistics[];
    MachineStatisticsHistory: Documents.IStatisticsHistory[];
    MachineMetricSettings: Documents.IMachineMetricSettings[];
    MachineScheduleSummary: Documents.IScheduleSummary[];
    MachineSchedule: Documents.IMachineSchedule[];
    JobDetail: Documents.IJobDetailDto[];
    AndonSequenceConfig: Documents.IAndonSequenceConfig[];
    AndonViews: Documents.IAndonView[];
    TaskFilters: Documents.ITaskFacet[];
    UsersTaskFilters: Documents.IUserTaskFilters[];
    BundleResult: Documents.IBundleResult[];
    OrderImportEvents: Documents.IOrderImportEvent[];
    CoilImportEvents: Documents.ICoilImportEvent[];
    OrderImportConfigs: Documents.IOrderImportConfig[];
    CoilImportConfigs: Documents.ICoilImportConfig[];
    ExportConfigs: Documents.IExportConfig[];
    ExportEvents: Documents.IExportEvent[];
}

const reducers: ActionReducerMap<State> = {
    SystemInfo: collectionReducerSingleton<any>('SystemInfo', {}),
    UpdateInfo: collectionReducerSingleton<any>('UpdateInfo', {}),
    SystemAgent: collectionReducerSingleton<any>('SystemAgent', {}),
    Machine: collectionReducer<Documents.IMachine>('Machine'),
    MetricDefinition: collectionReducerSingleton<Documents.IMetricDefinition[]>('MetricDefinition', []),
    MachineState: collectionReducer<Documents.IMachineState>('MachineState'),
    MachineStatistics: collectionReducer<Documents.IRollformingStatistics>('MachineStatistics'),
    MachineStatisticsHistory: collectionReducer<Documents.IStatisticsHistory>('MachineStatisticsHistory'),
    MachineMetricSettings: collectionReducer<Documents.IMachineMetricSettings>('MachineMetricSettings'),
    MachineScheduleSummary: collectionReducer<Documents.IScheduleSummary>('MachineScheduleSummary'),
    MachineSchedule: collectionReducer<Documents.IMachineSchedule>('MachineSchedule'),
    JobDetail: collectionReducer<Documents.IJobDetailDto>('JobDetail'),
    AndonSequenceConfig: collectionReducer<Documents.IAndonSequenceConfig>('AndonSequenceConfig'),
    AndonViews: collectionReducerSingleton<Documents.IAndonView[]>('AndonViews', []),
    TaskFilters: collectionReducerSingleton<Documents.ITaskFacet[]>('TaskFilters', []),
    UsersTaskFilters: collectionReducer<Documents.IUserTaskFilters>('UsersTaskFilters'),
    BundleResult: collectionReducer<Documents.IBundleResult>('BundleResult'),
    OrderImportEvents: collectionReducer<Documents.IOrderImportEvent>('OrderImportEvents'),
    CoilImportEvents: collectionReducer<Documents.ICoilImportEvent>('CoilImportEvents'),
    OrderImportConfigs: collectionReducer<Documents.IOrderImportConfig>('OrderImportConfigs'),
    CoilImportConfigs: collectionReducer<Documents.ICoilImportConfig>('CoilImportConfigs'),
    ExportConfigs: collectionReducer<Documents.IExportConfig>('ExportConfigs'),
    ExportEvents: collectionReducer<Documents.IExportEvent>('ExportEvents'),
};


export const reducer = combineReducers(reducers);
