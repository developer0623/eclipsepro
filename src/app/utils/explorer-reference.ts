import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';

class CoilData {
  coilSerialNumber: string;
}
class OperatorData {
  employeeNumber: string;
  employeeName: string;
}
class LossCode {
  codeValue: string;
  codeDescription: string;
}
export interface IData {
  employeeNumber: string;
  goodFt: number;
  goodLocal: number;
  date: any;
  shift: any;
  machine: {machineNumber: number, machineDescription: string};
  materialCode: string;
  toolingCode: string;
  partLengthIn: number;
  partLengthLocal: number;
  customerName: string;
  punching: boolean;
  coil: CoilData;
  operator: OperatorData;
  targetAvailabilityPotentialFt: number;
  yieldPotentialFt: number;
  speedPotentialFt: number;
  targetPercent: number;
  availabilityPercent: number;
  speedPercent: number;
  yieldPercent: number;
  scrapLengthFt: number;
  lossCode: LossCode;
  availabilityPotentialFt: number;
  downMinutes: number;
  scrapLengthLocal: number;
}
export interface IReducedData {
  goodLocal: number;
  goodFt: number;
  targetAvailabilityPotentialFt?: number;
  speedPotentialFt: number;
  yieldPotentialFt: number;
  availabilityPotentialFt: number;
  allDownMinutes: number;
  scrapLengthLocal: number;
  targetPercent: number;
  availabilityPercent: number;
  speedPercent: number;
  yieldPercent: number;
  oeePercent: number;
}

export function reduceInitial(): number {
  return 0;
}

export function loadCrossFilter(data: IData[],
  filterFn: (item: IData) => boolean,
  reduceAddFn: (p: number, v: IData) => number,
  reduceRemoveFn: (p: number, v: IData) => number,
  reduceOrderFn: (p: IReducedData) => number) {

    let rawData = data;

    const crossFilter = crossfilter(rawData.filter(filterFn));
    const reduceAdd = reduceAddFn;
    const reduceRemove = reduceRemoveFn;
    // const reduceOrderFn = d => d;


    const byDayDimension = crossFilter.dimension(d => d3.timeDay(new Date(d.date)));
    const byShiftDimension = crossFilter.dimension(d => d.shift);
    const byMachineDimension = crossFilter.dimension(d => (d.machine.machineDescription + ' [' + d.machine.machineNumber + ']'));
    const byMaterialDimension = crossFilter.dimension(d => d.materialCode);
    const byProductDimension = crossFilter.dimension(d => d.toolingCode);
    const byPartLengthDimension = crossFilter.dimension(d => (d.partLengthIn > 0 ? Math.ceil(d.partLengthLocal) : 0));
    const byCustomerDimension = crossFilter.dimension(d => d.customerName);
    const byCoilDimension = crossFilter.dimension(d => d.coil.coilSerialNumber);
    const byOperatorDimension = crossFilter.dimension(d => '[' + d.operator.employeeNumber + ']' + d.operator.employeeName);
    const byPunchedDimension = crossFilter.dimension(d => (d.punching ? 'Yes' : 'No'));
    const byReasonDimension = crossFilter.dimension(d => (d.lossCode.codeValue + ' ' + d.lossCode.codeDescription));

    return {

      update: (newData?) => {

        if (newData) {
          rawData = newData;
        }
        crossFilter.remove();
        crossFilter.add(rawData.filter(filterFn));
        dc.redrawAll();
      },

      resetAll: () => {
        dc.filterAll();
        dc.renderAll();
      },
      remove: () => {
        crossFilter.remove();
      },

      byDayDimension: byDayDimension,
      byDayGroup : byDayDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn),

      byShiftDimension : byShiftDimension,
      byShiftGroup : byShiftDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn),

      byMachineDimension: byMachineDimension,
      byMachineGroup : byMachineDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn),

      byMaterialDimension: byMaterialDimension,
      byMaterialGroup : byMaterialDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn),

      byProductDimension: byProductDimension,
      byProductGroup : byProductDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn),

      byPartLengthDimension: byPartLengthDimension,
      byPartLengthGroup : removeEmptyBins(
        byPartLengthDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn)
      ),

      byCustomerDimension: byCustomerDimension,
      byCustomerGroup : byCustomerDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn),

      byCoilDimension: byCoilDimension,
      byCoilGroup : byCoilDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn),

      byOperatorDimension: byOperatorDimension,
      byOperatorGroup : byOperatorDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn),

      byReasonDimension: byReasonDimension,
      byReasonGroup : byReasonDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn),

      byPunchedDimension: byPunchedDimension,
      byPunchedGroup : byPunchedDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(reduceOrderFn)
    };
  }

export function removeEmptyBins(sourceGroup) {
  return {
    all: () => sourceGroup.all().filter(d => (d.value !== 0))
  };
}
