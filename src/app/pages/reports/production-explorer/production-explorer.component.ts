import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ProductionExplorerService } from 'app/services/production-explorer.service';
import { IData, IReducedData, loadCrossFilter} from 'app/utils/explorer-reference';

@Component({
  selector: 'app-production-explorer',
  templateUrl: './production-explorer.component.html',
  styleUrls: ['./production-explorer.component.scss']
})
export class ProductionExplorerComponent implements OnInit, OnDestroy {
  cfData;
  chartList = [
    {dimension: 'byShiftDimension', group: 'byShiftGroup', title: 'Shift'},
    {dimension: 'byMachineDimension', group: 'byMachineGroup', title: 'Machine'},
    {dimension: 'byMaterialDimension', group: 'byMaterialGroup', title: 'Material'},
    {dimension: 'byProductDimension', group: 'byProductGroup', title: 'Product'},
    {dimension: 'byCustomerDimension', group: 'byCustomerGroup', title: 'Customer'},
    {dimension: 'byPartLengthDimension', group: 'byPartLengthGroup', title: 'Part Length'},
    {dimension: 'byCoilDimension', group: 'byCoilGroup', title: 'Coil'},
    {dimension: 'byOperatorDimension', group: 'byOperatorGroup', title: 'Operator'},
    {dimension: 'byPunchedDimension', group: 'byPunchedGroup', title: 'Punched'}
  ];
  filterStartDate = new Date(2019, 8, 10);
  filterEndDate = new Date(2019, 9, 10);
  startDateMoment = moment();
  endDateMoment = moment();
  explorerDataSub$;

  constructor(private productionExplorerService: ProductionExplorerService) {
    this.startDateMoment = moment(this.productionExplorerService.startDate);
    this.endDateMoment = moment(this.productionExplorerService.endDate);
  }

  ngOnDestroy() {
    this.explorerDataSub$.unsubscribe();
    if (this.cfData) {
      this.cfData.remove();
    }
  }

  ngOnInit() {
    this.explorerDataSub$ = this.productionExplorerService.explorerDataSub$
    .subscribe(data => {
      if (this.cfData) {
        this.cfData.update(data.explorerData);
      } else {
        this.cfData = loadCrossFilter(
          data.explorerData,
          d => this.filter(d) && moment(d.date).isSameOrAfter(this.filterStartDate) &&
            moment(d.date).isSameOrBefore(this.filterEndDate),
          this.reduceAdd,
          this.reduceRemove,
          this.reduceOrder
        );
      }
    });
  }
  reduceAdd(p: number, v: IData): number {
    p += v.goodFt;
    return p;
  }

  reduceRemove(p: number, v: IData): number {
    p -= v.goodFt;
    return p;
  }

  filter(item: IData) {
    return item.goodFt > 0;
  }

  reduceOrder(item: IReducedData) {
    return item.goodFt;
  }

  update() {
    this.cfData.update();
  }

  resetAll() {
    this.cfData.resetAll();
  }

  onFilterRangeChange(point) {
    this.filterStartDate = point.start;
    this.filterEndDate = point.end;
    this.update();
  }

  moveFilterDate(inc: number) {
    const filterStartMoment = moment(this.filterStartDate);
    const filterEndMoment = moment(this.filterEndDate);
    const filterDiff = filterEndMoment.diff(filterStartMoment, 'days');
    if (inc === 1) {
      const endDiff = this.endDateMoment.diff(filterEndMoment, 'days');
      if (endDiff === 0) {
        return;
      }

      this.filterStartDate = this.filterEndDate;
      if (endDiff > filterDiff) {
        this.filterEndDate = filterEndMoment.add(filterDiff, 'd').toDate();
      } else {
        this.filterEndDate = this.productionExplorerService.endDate;
      }
    } else {
      const startDiff = filterStartMoment.diff(this.startDateMoment, 'days');
      if (startDiff === 0) {
        return;
      }

      this.filterEndDate = this.filterStartDate;
      if (startDiff > filterDiff) {
        this.filterStartDate = filterStartMoment.add(-1 * filterDiff, 'd').toDate();
      } else {
        this.filterStartDate = this.productionExplorerService.startDate;
      }
    }
  }
}
