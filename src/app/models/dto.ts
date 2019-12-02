export interface ICoilDto {
  id: string;
  coilId: string;
  documentId: string;
  materialCode: string;
  description: string;
  weightStartLbs: number;
  dateIn: Date;
  dateOut: Date;
  importDate: Date;
  vendorName: string;
  vendorCode: string;
  heatNumber: string;
  puchaseOrder: string;
  user1: string;
  user2: string;
  isComplete: boolean;
  lengthStartFt: number;
  lengthRemainingFt: number;
  lengthUsedFt: number;
  lengthNonExemptScrapFt: number;
  lengthExemptScrapFt: number;
  lengthOtherAdjustmentsFt: number;
  locationId: string;
  gauge: number;
  color: string;
  widthIn: number;
  materialType: string;
}

export interface IMaterialDto {
  id: string;
  materialCode: string;
  description: string;
  gauge: number;
  color: number;
  widthIn: number;
  type: string;
  lbsPerFt: number;
  costPerLb: number;
  thicknessIn: number;
  defaultCoilLengthFt: number;
  demandFt: number;
  onHandFt: number;
  onHandQty: number;
  balanceFt: number;
}

export interface IJobDetailDto {
  id: string;
  ordId: number;
  job: IJobSummary;
  items: IJobItem[];
  bundles: IJobBundle[];
}

export interface IJobState {
  ordId: number;
  orderCode: string;
  toolingCode: string;
  materialCode: string;
  machineNumber: number;
  completeFt: number;
  remainingFt: number;
  totalFt: number; // TODO: Is this not already on JobDetail.Job...do we really need to repeat it?
  startDateTime: Date;
  duration: string;
  completionDate: Date;
}

export interface IJobItem {
  itemId: number;
  jobOrderId: string;
  bundle: number;
  quantity: number;
  quantityDone: number;
  lengthIn: number;
  patternName: string;
  patternNumber: number;
  option: string;
  sequence: number;
  user1: string;
  user2: string;
  user3: string;
  user4: string;
  user5: string;
  externalItemId: string;
  messageText: string;
  holeCount: number;
  calculateLengthFromHole: boolean;
  bundleCode: string;
  doneDate: Date;
  stagger: boolean;
  weightLbs: number;
  pieceMark: string;
}

export interface IJobBundle {
  bundleId: number;
  jobOrderId: number;
  bundle: number;

  user1: string;
  user2: string;
  user3: string;
  user4: string;
  user5: string;
}

export interface IJobSummary {
  id: string;
  ordId: number;
  orderCode: string;
  toolingCode: string;
  machineNumber: number;
  sequence: number;
  isOnMachine: boolean;
  status: string;
  materialCode: string;
  hold: boolean;
  customerName: string;
  workOrder: string;
  truckNumber: string;
  /** You'll need to call `new Date(x.requiredDate)` or `moment(x.requiredDate)` if you want to use this as an actual `Date`. */
  requiredDate?: string;
  importDate: Date;
  user1: string;
  user2: string;
  user3: string;
  user4: string;
  user5: string;
  customerAddress1: string;
  customerAddress2: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
  customerCountry: string;
  customerInstructions: string;
  stagingBay: string;
  loadingDock: string;
  // State
  completeFt: number;
  remainingFt: number;
  totalFt: number;
  startDateTime: Date;
  duration: string;
  completionDate: Date;
  longestLengthIn: number;
  shortestLengthIn: number;
  materialColor: string;
  materialGauge: number;
  materialWidthIn: number;
  patternNotDefined: boolean;
  customerNumber: string;
  customerPhone: string;
  customerPO: string;
  salesOrder: string;
  shipDate?: string; // see requiredDat? above
}
export interface IAvailableJob {
  id: string;
  expectedRuntime: number;
  warningDueDate: boolean;
  pastDueDate: boolean;
  machineId: number;
  ordId: number;
}

export interface IAvailableJobColumn {
  fieldName: string;
  name: string;
  ischecked: boolean;
  id: number;
  color: string;
  displayName: string;
}
export interface IScheduledDowntime {

  id: number;
  documentID: string;
  /*
  'machines': [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  'title': 'Safety Meeting',
  'occurs': 'OneTime',
  'timeOfDay': '13:00:00',
  'duration': '00:15:00',
  'activityType': 'Break',
  'startDate': '2017-01-31T00:00:00-06:00',
  'occurenceCount': null,
  'daysOfWeek': null,
  'endDate': '1969-12-31T18:00:00-06:00',
  'endRepeat': 'Never',
  'everyCount': 0,
  'monthValue': 'Each',
  'selectedDate': null,
  'dayOfMonth': 'First',
  'weekDayOfMonth': 'Sunday'
  */
}

export interface IMachineState {
  id: string;
  machineNumber: number;
  // 'lastRunStateChange': '2016-02-16T15:23:45.152-06:00',
  runState: string;
  // 'machineName': 'Multi-profile Line',//not needed
  // 'eventDateTime': '2016-02-16T13:54:37-06:00',
  orderCode: string;
  materialCode: string;
  toolingCode: string;
  bundleNumber: number;
  currentItemAddress: string;
  currentItemLengthIn: number;
  currentItemExternalId: string;
  currentItemQty: number;
  currentItemQtyDone: number;
  currentCustomerName: string;
  currentWorkOrder: string;
  currentCoilId: string;
  currentCoilMaterialCode: string;
  currentCoilRemainingFeet: number;
  employeeNumber: string;
  employeeName: string;
  currentShiftCode: string;
  // 'serverReceivedDate': '2017-02-24T00:06:06.0382563-06:00'
}

export interface IScheduleSummary {
  id: string;
  // 'documentID': 'MachineScheduleSummary/1',
  machineNumber: number;
  currentOrderId: number;
  currentOrderCode: string;
  currentMaterialCode: string;
  currentToolingCode: string;
  currentOrderTotalFeet: number;
  currentOrderRemainingFeet: number;
  currentOrderPercentComplete: number;
  currentMaterialRemainingFeet: number;
  currentToolingRemainingFeet: number;
  currentBundleNumber: number;
  lastBundleNumber: number;
  currentLength: number;
  currentItemExternalId: string;
  currentItemQty: number;
  currentItemQtyDone: number;
  currentCustomerName: string;
  currentWorkOrder: string;
  currentCoilId: string;
  currentCoilMaterialCode: string;
  currentCoilRemainingFeet: number;
  nextOrderId: number;
  nextOrderCode: string;
  nextMaterialCode: string;
  nextToolingCode: string;
  nextOrderFeet: number;
  nextMaterialFeet: number;
  nextToolingFeet: number;
  nextOrderCustomerName: string;
  nextWorkOrder: string;
  scheduledFeetTotal: number;
  scheduledJobsCount: number;
  availableFeetTotal: number;
  availableJobsCount: number;
  atMachineFeetTotal: number;
  scheduleCompletionDate: Date;
}

export interface IScheduleEntry {
  id: string;
  activityType: string;
  startDateTime: Date;
  // TimeSpan Duration { get; set; }
  endDateTime: Date;
  durationMs: number;
  machineNumber: number;
  orderCode: string;
  materialCode: string;
  toolingCode: string;
  ordId: number;
  remainingFt: number;
  totalFt: number;
  customerName: string;
  jobId: string;
  title: string;
  state: string;
  downtimeId: number;
}

export interface IMachineSchedule {
  id: string;
  documentId: string;
  machineNumber: number;
  scheduleBlocks: IScheduleEntry[];
  asOf: Date;
}

export interface IHistVal {
  shiftCode: string;
  value: number;
}

export interface IStatisticsHistory {
  id: string;
  machineNumber: number;
  oEEHistory: IHistVal[];
  targetPctHistory: IHistVal[];
  scrapPctHistory: IHistVal[];
  goodFeetHistory: IHistVal[];
  runPctHistory: IHistVal[];
}

export interface IRollformingStatistics {
  id: string;
  documentID: string;
  machineNumber: number;
  start: Date;
  end: Date;
  startShiftCode: string;
  endShiftCode: string;
  recordCount: number;

  toolingChangeCount: number;
  coilChangeCount: number;
  materialChangeCount: number;
  goodPieceCount: number;
  scrapPieceCount: number;

  goodFeet: number;
  goodPct: number;
  scrapFeet: number;
  scrapPct: number;
  reclaimedScrapFeet: number;
  reclaimedScrapPct: number;
  scrapPareto: IAggregate[];

  totalMinutes: number;
  runMinutes: number;
  runPct: number;

  totalDelayMinutes: number;

  totalDelayPct: number;
  nonExemptMinutes: number;
  nonExemptPct: number;
  exemptMinutes: number;
  exemptPct: number;

  offlineMinutes: number;
  offlinePct: number;
  totalNonExemptMinutes: number;
  downtimePareto: IAggregate[];

  avgFPM: number;
  avgThroughput: number;
  oEE: number;
  targetPct: number;

  actualGoodFeet: number;
  expectedGoodFeet: number;
  targetFPM: number;
  targetGoodFeet: number;
  totalFeet: number;
  totalOperationMinutes: number;
  statusEventTime: Date;
  productionEventTime: Date;
}

export interface IAggregate {
  typeId: number;
  name: string;
  instanceCount: number;
  value: number;
  codeExempt: string;
  codeResponsibility: number;
}

export interface IMachineMetricSettings {
  id: number;
  documentId: string;
  machineNumber: number;
  settings: IMetricConfig[];
}

export interface IMetricConfig {
  metricName: string;
  targetValue: number;
  okRangeStart: number;
  okRangeEnd: number;
  maxValue: number;
  minValue: number;
  showInMini: boolean;
  showInLarge: boolean;
}
export interface IMetricDefinition {
  metricName: string;
  primaryDataKey: string;
  primaryUnits: string;
  secondaryDataKey: string;
  secondaryUnits: string;
  historyKey: string;
  lowerIsBetter: boolean;
  targetValue: number;
  minValue: number;
  maxValue: number;
  okRangeStart: number;
  okRangeEnd: number;
  nameToolTip: string;
  primaryToolTip: string;
  secondaryToolTip: string;
  historyToolTip: string;
  showInMini: boolean;
  showInLarge: boolean;
}

export interface IMachineTooling {
  id: string;
  machineId: string;
  toolingId: string;
}

export interface IMachine {
  id: number;
  name: string;
  machineNumber: number;
  description: string;
  isActive: boolean;
}

export interface ISchedule {
  id: string;
  machineNumber: number;
  sequence: {
    id: string;
    sequenceNum: number;
    warningDueDate: boolean;
    warningMaterial: boolean;
    pastDueDate: boolean;
    machineId: string;
    jobId: string;
    ordId: number;
    isOnMachine: boolean;
    remainingRuntime: string; // HH:MM:SS format
  }[];
}

export interface IJobs {
  id: string;
  orderId: string;
  requiredDate: Date;
  importDate: Date;
  totalFt: Number;
  hold: Boolean;
  customerName: string;
  workOrder: string;
  truckNumber: string;
  stagingBay: string;
  loadingDock: string;
  customerAddress1: string;
  customerAddress2: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
  customerCountry: string;
  customerInstructions: string;
  toolingId: string;
  coilTypeId: string;
  JobStateId: string;
}

export interface ITooling {
  id: string;
  name: string;
  description: string;
}

export interface ICoilType {
  id: string;
  name: string;
  width: Number;
  materialGauge: Number;
  materialColor: string;
  materialElementType: string;
}

export interface ICoil {
  id: string;
  serialNumber: string;
  vendor: string;
  startingLength: Number;
  storageLocation: string;
  coilTypeId: string;
}

export interface IJobStateDto {
  id: string;
  completionDate: Date;
  remaingRuntime: Number;
  completFt: Number;
  jobId: string;
}

export interface IConsumptionHistory {
  id: string;
  avgFPM: number;
  coilMaterialCode: string;
  coilSerialNumber: string;
  exemptMinutes: number;
  goodFeet: number;
  goodPieceCount: number;
  machineNumber: number;
  materialCode: string;
  nonExemptMinutes: number;
  ordId: string;
  orderCode: number;
  productionDate: Date;
  reclaimedScrapFeet: number;
  recordCount: number;
  runMinutes: number;
  scrapFeet: number;
  scrapPct: number;
  scrapPieceCount: number;
  targetFPM: number;
  toolingCode: string;
  totalFeet: number;
  totalMinutes: number;
  totalOperationMinutes: number;
}



export interface ITask {
  id: string;
  taskType: string;
  coilType: ICoilType;
  requiredFt: number;
  sourceLocationId: string;
  destinationLocationId: string;
  requiredDate: string;
  startedDate: Date;
  availableDate: Date;
  completedDate: Date;
  taskState: string;
  preferredCoils: ITaskCoil[];
  nonpreferredCoils: ITaskCoil[];
  userName: string;
  overrideCode?: IReasonCode;
}

export interface ITaskCoil extends ICoil {
  id: string;
  warningFields: string[];
}

export interface IReasonCode {
  id: string;
  codeSet: string;
  reason: string;
}

export enum LocationCategory { Machine, Warehouse, StagingBay, Truck, LoadingDock, Bin }
export interface ILocation {
  id: string;
  code: string;
  name: string;
  category: LocationCategory;
}
export interface ISystemPreferences {
  systemLanguage: string;
  inchesUnit: string;
  allowPrereleaseVersions: boolean;
}
export interface ISystemInfo {
  plantName: string;
  timeZone: string;
  version: string;
}
export interface ILanguage {
  title: string;
  translation: string;
  code: string;
}

export interface IAlert {
  id: string;
}

export interface IAndonSequenceConfig {
  id: string;
}

export interface IAndonView {
  name: string;
  viewKey: string;
  hasChart: string;
}

export interface ITaskFacet {
  title: string;
  filters: ITaskFacetValue[];
}
export interface ITaskFacetValue {
  id: string;
  title: string;
}
export interface IUserTaskFilter {
  filterId: string;
  checked: boolean;
}

export interface IUserTaskFilters {
  id: string;
  userName: string;
  filters: IUserTaskFilter[];
}
export interface IOrderImportEvent {
  id: string;
  batchId: string;
  settingsId: string;
  start: Date;
  state: string;
  recordCount: number;
  importedCount: number;
  rejectedCount: number;
  rejects: {
    externalSystemRecordId: string,
    recordTitle: string,
    failureMessages: string[],
  };
}
export interface ICoilImportEvent {
  id: string;
  batchId: string;
  settingsId: string;
  start: Date;
  state: string;
  recordCount: number;
  importedCount: number;
  rejectedCount: number;
  rejects: {
    externalSystemRecordId: string,
    failureMessages: string[],
  };
}
export interface IOrderImportConfig {
  id: string;
  type: string;
  state: string;
  settings: any;
  messages: string[];
}
export interface ICoilImportConfig {
  id: string;
  type: string;
  state: string;
  settings: any;
  messages: string[];
}
export interface IExportConfig {
  id: string;
  type: string;
  state: string;
  settings: any;
  messages: string[];
}

export interface IExportEvent {
  id: string;
  channel: string;
  itemId: string;
  complete: boolean;
  stage: string;
  receivedTime: Date;
  activityLog: string[];
}

export interface IBundleResult {
  id: string;
  ordId: number;
  orderCode: string;
  materialCode: string;
  toolingCode: string;
  workOrder: string;
  bundleNumber: number;
  producedLengthIn: number;
  longestLengthIn: number;
  exportComplete: boolean;
  isExporting?: boolean;
  hide?: boolean;
}

type Percentage = number;
type Length = number;
type Cardinal = number;
type Velocity = number;
type TimeSpan = number;
type UnitOfMeasure = Percentage | Length | Cardinal | Velocity;

export interface IBulletChartModel<TUnitOfMeasure> {
  targetValue: TUnitOfMeasure;
  okRangeStart: TUnitOfMeasure;
  okRangeEnd: TUnitOfMeasure;
  maxValue: TUnitOfMeasure;
  minValue: TUnitOfMeasure;
  // The actual current value
  value: TUnitOfMeasure;
}

export interface IHistoricValue<TUnitOfMeasure> {
  shiftCode: string;
  value: TUnitOfMeasure;
}

export interface IOneValueModel<T> {
  // The primary value of the metric.
  primary: T;
  // The sparkline values
  history: IHistoricValue<T>[];
  // The bullet chart data points
  bullet: IBulletChartModel<T>;
}
export interface ITwoValuesModel<TPrimary, TSecondary> extends IOneValueModel<TPrimary> {
  // The secondary value of the metric.
  secondary: TSecondary;
}

export interface IProductionSummaryReportRecord {
  id: number;
  totalGoodLn: ITwoValuesModel<Length, Cardinal>;
  netScrap: ITwoValuesModel<Percentage, Length>;
  runningThroughput: IOneValueModel<Velocity>;
  oEE: IOneValueModel<Percentage>;
  target: IOneValueModel<Percentage>;
  availability: IOneValueModel<Percentage>;
  speed: IOneValueModel<Percentage>;
  yield: IOneValueModel<Percentage>;
  timeBar: {
    running: Percentage;
    changeover: Percentage;
    breakdown: Percentage;
    otherDowntime: Percentage;
    exempt: Percentage;
    unscheduled: Percentage;
    availableTime: TimeSpan;
    durationTime: TimeSpan;
  };
}

export interface IProductionSummaryReportModel {
  records: IProductionSummaryReportRecord[];
}


export namespace Fx {
  export const ALL = '[ALL';
  export const IN = '[IN]';
  export const RANGE = '[RANGE]';

  export class In {
    public type = IN;
    constructor(
      public property: string,
      public values: any[]
    ) {
      if (values.length === 0) {
        // throw '`values` array cannot be empty';
      }
    }
  }
  export class All {
    public type = ALL;
    constructor() { }
  }
  export class Range {
    public type = RANGE;
    constructor(
      public property: string,
      public start: any,
      public end: any
    ) { }
  }

  export type FilterDef = In | All | Range;
  export function toFilterExpr<T>(filterDef: FilterDef): (T) => boolean {
    switch (filterDef.type) {
      case ALL: { return _ => true; }
      case IN: {
        const init = (t: T) => false;
        const in_filter = filterDef as In;
        return in_filter.values.reduce((acc, value) => ((t: T) => t[in_filter.property] === value || acc(t)), init);
      }
      case RANGE: {
        // throw 'Not implemented';
      }
    }
  }
  export class Subscription {
    public id: string;

    constructor(
      public collection: string,
      public filterDef: Fx.FilterDef
    ) {
      // this.id = this.uuidv4();
    }

    // private uuidv4() {
    //   // from https://stackoverflow.com/a/2117523/947
    //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //     const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    //     return v.toString(16);
    //   });
    // }
  }
}

export interface IDateRange {
  minDate: Date;
  maxDate: Date;
}
