import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as Documents from '../models/dto';
import { In, FilterDef } from 'app/store/subscriptions/objects';
import { expand, filter, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Initialize } from 'app/store/subscriptions/actions';
interface Paging {
  skip: number;
  take: number;
}
@Injectable({
  providedIn: 'root',
})
export class Api {
  // private API_PATH = 'http://test-eclipse.amscontrols.com:8080';
  private API_PATH = 'http://pro-alpha.amscontrols.com:8080';
  // private API_PATH = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  private getDocuments<T>(api: string) {
    return this.http.get<T>(`${this.API_PATH}${api}`);
  }

  private getData<T>(api: string, args) {
    let params = new HttpParams();
    Object.keys(args).forEach((key) => {
      params = params.append(key, args[key]);
    });

    return this.http.get<T>(`${this.API_PATH}${api}`, { params });
  }

  private getDocumentsWArgs<T>(api: string, args) {
    let skip = args.skip;
    const take = args.take || 32;
    return this.getData<T>(api, args).pipe(
      expand((results: any) => {
        skip += take;
        if (results.length >= take) {
          const newArgs = {
            ...args,
            skip,
            take
          };
          return this.getData<T>(api, newArgs);
        }

        return EMPTY;
      }),
      filter((results: any) => results.length > 0)
    );
  }


  // Alerts
  getAlerts() {
    return this.getDocuments<Documents.IAlert[]>(`/api/alerts`);
  }
  postAlertAction(action: { id: string, action: string }) {
    return this.http.post(`${this.API_PATH}/api/alerts/action`, action);
  }

  // Andon
  getAndOnSequencesList() {
    return this.getDocuments('/api/andonSequences');
  }
  getAndonSequence(id) {
    return this.getDocuments(`/api/andonSequences/${id}`);
  }
  postAndonSequenceUpdate(sequence: {}) {
    return this.http.post(`${this.API_PATH}/api/andonSequences/`, { body: sequence });
  }
  deleteAndonSequence(sequenceId: string) {
    return this.http.delete(`${this.API_PATH}/api/andonSequences/${sequenceId}`);
  }
  postAndonControl(action: string) {
    return this.http.post(`${this.API_PATH}/api/andonControl/${action}`, {});
  }

  // Dashboard
  getMachineList() {
    return this.getDocuments<Documents.IMachine[]>('/api/machine');
  }
  getMachine(machine: number) {
    return this.getDocuments<Documents.IMachine[]>(`/api/machine/${machine}`);
  }
  getMachineState(machine: number) {
    return this.getDocuments<Documents.IMachineState>(`/api/machine/${machine}/state`);
  }
  getMachineStateList() {
    return this.getDocuments<Documents.IMachineState[]>(`/api/machine/state`);
  }
  getMachineScheduleEstimateList() {
    return this.getDocuments(`/api/machine/schedule/estimate`);
  }
  getMachineScheduleEstimate(machine: number) {
    return this.getDocuments(`/api/machine/${machine}/schedule/estimate`);
  }
  getMachineScheduleSummaryList() {
    return this.getDocuments<Documents.IScheduleSummary[]>(`/api/machine/schedule/summary`);
  }
  getMachineScheduleSummary(machine: number) {
    return this.getDocuments<Documents.IScheduleSummary>(`/api/machine/${machine}/schedule/summary`);
  }
  getMachineStatisticsHistory(machine: number) {
    return this.getDocuments<Documents.IStatisticsHistory>(`/api/machine/${machine}/statistics/hist`);
  }
  getMachineStatisticsHistoryList() {
    return this.getDocuments<Documents.IStatisticsHistory[]>(`/api/machine/statistics/hist`);
  }
  getMachineStatisticsCurrentShift(machine: number) {
    return this.getDocuments<Documents.IRollformingStatistics>(`/api/machine/${machine}/statistics/shift/current`);
  }
  getMachineStatisticsCurrentShiftList() {
    return this.getDocuments<Documents.IRollformingStatistics[]>(`/api/machine/statistics/shift/current`);
  }
  getMachineStatisticsForAShift(machine: number, shift: string) {
    return this.getDocuments<Documents.IRollformingStatistics>(`/api/machine/${machine}/statistics/shift/${shift}`);
  }
  getMachineProduction(args: { machine: number }) {
    return this.getDocuments(`/api/machine/${args.machine}/production`);
  }
  getMachineMetricSettings(machine: number) {
    return this.getDocuments<Documents.IMachineMetricSettings>(`/api/machine/${machine}/metricsettings`);
  }
  getMachineMetricSettingsList() {
    return this.getDocuments<Documents.IMachineMetricSettings[]>(`/api/machine/metricsettings`);
  }
  putMachineMetricSettings(machine: number, settings: Documents.IMetricConfig[]) {
    return this.http.put<any>(`${this.API_PATH}/api/machine/${machine}/metricsettings`, settings);
  }
  getMetricDefinitions() {
    return this.getDocuments<Documents.IMetricDefinition[]>(`/api/metricDefinitions`);
  }
  // Integration
  // TODO: Put Integration module api calls here.

  // Machine configuration
  getMachinePerformanceStandardsList() {
    return this.getDocuments<{}[]>(`/api/machinePerformanceStandards`);
  }
  postMachinePerformanceStandardsList(entry: {}) {
    return this.http.post(`${this.API_PATH}/api/machinePerformanceStandards`, { body: entry });
  }

  // Material
  getMaterialList(filterDef: FilterDef<Documents.IMaterialDto>, paging: Paging) {
    return this.getDocumentsWArgs<Documents.IMaterialDto[]>('/api/material', { ...filterDef, ...paging });
  }
  getMaterial(materialCode: string) {
    return this.getDocuments<Documents.IMaterialDto>(`/api/material/${materialCode}`);
  }
  getCoilList(filterDef: FilterDef<Documents.ICoilDto[]>, paging: Paging) {
    return this.getDocumentsWArgs<Documents.ICoilDto[]>('/api/coils', { ...filterDef, ...paging });
  }
  getCoil(coilId: string) {
    return this.getDocuments<Documents.ICoil>(`/api/coils/${coilId}`);
  }
  getConsumptionSummary(filterDef: FilterDef<{}[]>, paging: Paging) {
    return this.getDocumentsWArgs<{}[]>('/api/consumptionSummary', { ...filterDef, ...paging });
  }

  // Schedule
  getJobSummariesList(filterDef: FilterDef<Documents.IJobSummary[]>, paging: Paging) {
    return this.getDocumentsWArgs<Documents.IJobSummary[]>('/api/jobSummaries', { ...filterDef, ...paging });
  }
  getJobDetail(jobId: string) {
    return this.http.get<Documents.IJobSummary[]>(`/api/jobDetails/${jobId}`);
  }
  getMachineSchedule(machine: number) {
    return this.getDocuments<Documents.IMachineSchedule>(`/api/machineSchedule/${machine}`);
  }
  getMachineScheduleList(filterDef: FilterDef<Documents.IMachineSchedule[]>, paging: Paging) {
    return this.getDocumentsWArgs<Documents.IMachineSchedule[]>('/api/machineSchedule', { ...filterDef, ...paging });
  }
  getScheduledDowntimeDefinitionsList() {
    return this.getDocuments<Documents.IScheduledDowntime[]>(`/api/scheduledDowntimeDefinitions`);
  }
  getScheduledDowntimeDefinition(sddId: string) {
    return this.getDocuments<{}[]>(`/api/scheduledDowntimeDefinitions/${sddId}`);
  }
  updateScheduledDowntimeDefinition(sddId: string, def: {}) {
    return this.http.put<Documents.IScheduledDowntime>(`${this.API_PATH}/api/scheduledDowntimeDefinitions/${sddId}`, { ...def });
  }
  addScheduledDowntimeDefinitions(def: {}) {
    return this.http.post<Documents.IScheduledDowntime>(`${this.API_PATH}/api/scheduledDowntimeDefinitions`, { ...def });
  }
  deleteScheduledDowntimeDefinition(sddId: string) {
    return this.http.delete<any>(`${this.API_PATH}/api/scheduledDowntimeDefinitions/${sddId}`);
  }
  getBundleResults(filterDef: FilterDef<{}[]>, paging: Paging) {
    return this.getDocumentsWArgs<{}[]>('/api/bundleResults', { ...filterDef, ...paging });
    // return this.http.get<{}[]>(`/api/bundleResults`, { params: { ...filter, ...paging } });
  }

  // Scheduling
  getJobsList(paging: Paging) {
    return this.getDocumentsWArgs<{}[]>('/_api/jobs', paging);
    // return this.http.get<{}[]>(`${this.API_PATH}_api/jobs`, { params: paging });
  }
  getJobStatesList(paging: Paging) {
    return this.getDocumentsWArgs<{}[]>('/_api/jobstate', paging);
    // return this.http.get<{}[]>(`${this.API_PATH}/_api/jobstate`, { params: paging });
  }
  getAvailableJobs(filterDef: FilterDef<Documents.IAvailableJob>, paging: Paging) {
    return this.getDocumentsWArgs<Documents.IAvailableJob[]>('/_api/availablejobs', { ...filterDef, ...paging });
  }
  getScheduledJobs(filterDef: FilterDef<Documents.ISchedule>, paging: Paging) {
    return this.getDocumentsWArgs<Documents.ISchedule[]>('/_api/schedules', { ...filterDef, ...paging });
  }
  getToolingList(paging: Paging) {
    return this.getDocumentsWArgs<{}[]>('/_api/tooling', paging);
    // return this.http.get<{}[]>(`${this.API_PATH}/_api/tooling`, { params: paging });
  }
  getCoilTypeList(paging: Paging) {
    return this.getDocumentsWArgs<{}[]>('/_api/coiltype', paging);
    // return this.http.get<{}[]>(`${this.API_PATH}/_api/coiltype`, { params: paging });
  }
  postScheduleAvailableJobs(machineNumber: number, availableJobIds: number[], isOnMachine: boolean, requestedSequenceNumber?: number) {
    return this.http.post(`${this.API_PATH}/_api/scheduleAvailableJob`, {
      machineId: machineNumber, availableJobIds, isOnMachine
    });
  }
  postRemoveScheduledJobs(machineNumber: number, scheduledJobIds: number[]) {
    return this.http.post(`${this.API_PATH}/_api/removeScheduledJob`, {
      machineId: machineNumber, scheduledJobIds
    });
  }
  postRescheduleJobs(machineNumber: number, scheduledJobIds: number[], requestedSequenceNumber: number) {
    return this.http.post(`${this.API_PATH}/_api/rescheduleJob`, {
      machineId: machineNumber, scheduledJobIds, requestedSequenceNumber
    });
  }

  // Search
  getSearch(query: string) {
    return this.http.get<{}[]>(`${this.API_PATH}/api/search`, { params: { q: query } });
  }

  // Subscriptions
  addSubscription(subscription, clientId: string) {
    return this.http.post(`${this.API_PATH}/api/subscription/add`, { ...subscription, clientId });
  }
  deleteSubscription(id) {
    return this.http.delete(`${this.API_PATH}/api/subscription/delete/${id}`);
  }

  // System
  getSystemInfo() {
    return this.getDocuments<Documents.ISystemInfo>(`/api/systemInfo`);
  }
  getSystemPreferences() {
    return this.getDocuments<Documents.ISystemPreferences>(`/api/systemPreferences`);
  }
  postSystemPreferences(preferences: {}) {
    return this.http.post(`${this.API_PATH}/api/systemPreferences`, { body: preferences });
  }
  getVersion() {
    return this.getDocuments<{}>(`/api/version`);
  }
  getAgentStatus() {
    return this.getDocuments<{}>(`/api/agentStatus`);
  }
  getCheckUpdate() {
    return this.getDocuments<{}>(`/api/checkUpdate`);
  }
  postSelfUpgrade() {
    return this.http.post(`${this.API_PATH}/api/selfupgrade`, {});
  }
  getLanguageCode(languageCode: string) {
    return this.getDocuments<{}>(`/api/i18n?languageCode=${languageCode}`);
  }
  getFeatures() {
    return this.getDocuments<{}>(`/api/features`);
  }

  postFeature(feature: string, enabled: boolean) {
    return this.http.post(`${this.API_PATH}/api/features/${feature}?enabled=${enabled}`, {});
  }

  // User
  postAvailableJobColumns(columns: Documents.IAvailableJobColumn[]) {
    return this.http.post(`${this.API_PATH}/_api/user/settings/availableJobColumns`, { body: columns });
  }
  getAvailableJobColumns() {
    return this.getDocuments<Documents.IAvailableJobColumn[]>(`/_api/user/settings/availableJobColumns`);
  }

  // Warehouse
  getTasks(filterDef: FilterDef<Documents.ITask>, paging: Paging) {
    return this.getDocumentsWArgs<Documents.ITask[]>('/_api/warehouse/tasks', { ...filterDef, ...paging });
  }
  getTask(taskId: string) {
    return this.getDocuments<Documents.ITask>(`/_api/warehouse/tasks/${taskId}`);
  }
  getLocations() {
    return this.getDocuments<Documents.ILocation[]>(`/_api/warehouse/locations`);
  }
  postLocation(location) {
    return this.http.post(`${this.API_PATH}/_api/warehouse/locations`, { ...location });
  }
  getReasonCodes() {
    return this.getDocuments<Documents.IReasonCode[]>(`/_api/warehouse/reasons`);
  }
  postReasonCode(reasonCode) {
    return this.http.post(`${this.API_PATH}/_api/warehouse/reasons`, { ...reasonCode });
  }

  deleteReasdonCode(id: string) {
    return this.http.delete(`${this.API_PATH}/_api/warehouse/reasons/${id}`);
  }

  // Authentication
  postLogin(username: string, password: string) {
    return this.http.post(`${this.API_PATH}/api/auth/login`, { username, password, application: `Web.UI` });
  }
  getLogout() {
    return this.http.get(`${this.API_PATH}/api/auth/logout`);
  }

  // getTasks(filterDef: FilterDef<Documents.ITask>, paging: Paging) {
  //   return this.getDocumentsWArgs<Documents.ITask[]>('/_api/warehouse/tasks', { ...filterDef, ...paging });
  // }

  // Production Explorer
  getProductionData(filterDef: FilterDef<Documents.ITask>, paging: any) {
    // return this.getDocuments<any[]>(`/api/productionexplorer`);
    return this.getDocumentsWArgs<any[]>('/api/productionexplorer', { ...filterDef, ...paging });
  }

  getProductionRange() {
    return this.http.get(`${this.API_PATH}/api/productionexplorer/range`);
  }

  // Production Summary
  getProductionSummary(filterDef) {
    return this.getDocumentsWArgs<{}[]>('/api/productionSummary', filterDef);
    // return this.http.get<{}[]>(`${this.API_PATH}/api/productionSummary`, { params: filter });
  }
}
