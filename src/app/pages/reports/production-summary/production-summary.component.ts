import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import * as moment from 'moment';
import { ReportsService } from 'app/services/reports.service';
import { CustomDateModalComponent } from './components/custom-date-modal/custom-date-modal.component';
import { PrintPreviewDialogComponent } from './components/print-preview-dialog/print-preview-dialog.component';

type Duration = 'w' | 'M' | 'd';

@Component({
  selector: 'app-production-summary',
  templateUrl: './production-summary.component.html',
  styleUrls: ['./production-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductionSummaryComponent implements OnInit, OnDestroy {
  durations = [
    {title: 'Day', selected: true},
    {title: 'Week', selected: false},
    {title: 'Month', selected: false},
    {title: 'Custom', selected: false}
  ];
  selectedDuration = this.durations[0];
  startDate = {date: moment(), isOpen: false};
  endDate = {date: moment(), isOpen: false};
  formStartDate = new FormControl(this.startDate.date.format());
  shiftMenuTitle: string | number = 'All';
  shiftMenu = [{name: 1, isChecked: true}, {name: 2, isChecked: true}, {name: 3, isChecked: true}];
  customDurationLength = 1;
  customSelectedDuration = 'Days';
  machines$;
  machines = [];
  selectedMachinesNum = 0;
  allMachineItem = {name: 'All', isChecked: true};
  summaryList$;
  machineIndeterminate = false;
  measureMenu = [{title: 'Length', selected: true}, {title: 'Area', selected: false}, {title: 'Weight', selected: false}];
  selectedMeasure = this.measureMenu[0];
  isFirstLoaded = false;
  headers = {
    good: {
      index: 0,
      title: 'Total GOOD',
      description: `Total amount of good production by finished length or weight as well as the total number of good parts.
       These totals include parts that were originally good as well as those reclaimed from previously reported scrap.
      <br/><br/>Calculation: sum(number of good parts * finished part length)`
    },
    scrap: {
      index: 1,
      title: 'Net SCRAP',
      description: `Total amount of material consumed that did not end up as a good part.
       This includes bad parts as well as scrap caused by manual shears, coil thread-up & tail-out, etc.
       <br/><br/>Note: for some products the length of material consumed does not equal the finished part length.
       In those cases the total good length plus total net scrap will not add up to match the total length consumed.
       <br/><br/>Calculation: sum(material consumed) - sum(number of good parts * expected material consumed/part)`
    },
    throughput: {
      index: 2,
      title: 'RUNNING THROUGHPUT',
      description: 'Average production rate when the machine is running. <br/><br/>Calculation: sum(Good product) / sum(Run minutes)'
    },
    oee: {
      index: 3,
      title: 'OEE',
      description: `OEE = Overall Equipment Effectiveness<br/>
      This is the ratio of actual good production to the theoretical output if the machine ran 100% of the
       scheduled (available) production time at 100% of the rated speed for the current product and 100% yield (no bad parts).
      <br/><br/>Calculation: sum(Good product) / sum( Available Time * Rated Speed) ) where Available Time = total time - exempt time`
    },
    target: {
      index: 4,
      title: 'TARGET',
      description: `Ratio of actual good production to the theoretical output if the machine ran according to established standards.
       <br/><br/>100% Target means all coil, material, tooling changeovers take the time given by the standard work definition for a
        safe change & besides changeovers, 100% of the scheduled production time is spent running,
        the machine runs at 100% of the rated speed for the current product, 100% of the parts produced are good.
        <br/><br/>Calculation: sum(Good product) / sum( (Available - Standard Changeover time) * Rated Speed) )
        where Available Time = total time - exempt time`
    },
    availability: {
      index: 5,
      title: 'AVAILABILITY',
      description: `Simple definition: the percentage of scheduled production time the machine is actually running.
       Note: using time-based percentage only works when the range of products being produced all have the same target production speed.
       When calculating an aggregate value across a range of mixed product target speeds, it is necessary to use ratios of production
       values (length, weight, etc).<br/><br/>Calculation: sum(Running Time * Rated Speed) / sum( Available Time * Rated Speed) )
       where Available Time = total time - exempt time`
    },
    speed: {
      index: 6,
      title: 'SPEED',
      description: `The ratio of actual running speed to the target production speed for the product.
       The target production speed is defined based on the equipment capabilities for the current product and length.
       When calculating an aggregate value across a range of mixed product target speeds, it is necessary to use ratios
       of production values (length, weight, etc).<br/><br/>Calculation:
       sum(Good & Bad Quantity * Part Length) / sum( Available Time * Rated Speed) ) where Available Time = total time - exempt time`
    },
    yield: {
      index: 7,
      title: 'YIELD',
      description: `The percentage of parts that were good.  <br/>Note: good parts includes parts that were reworked from bad parts
       or reclaimed from scrap material. \nCalculation: sum(Good product) / sum(Good & Bad Quantity * Part Length)`
    },
    reclaimed: {
      index: 8,
      title: 'RECLAIMED',
      description: `The amount of material that was previously reported as scrap that was reclaimed as good.
      This value is also included in the Total Good column.`
    }
};
  private reportFilterSubject$ = new Subject<any>();

  constructor(private router: Router, private route: ActivatedRoute, private reportService: ReportsService, private dialog: MatDialog) {
    this.machines$ = this.reportService.getOriginMachines().subscribe(machines => {
      this.machines = machines.map(m => {
        return {...m, isChecked: true};
      });
      this.selectedMachinesNum = machines.length;
    });

    this.reportFilterSubject$.subscribe(params => {
      const filterRef = {
        startDate: this.startDate.date.format('YYYY-MM-DD'),
        endDate: this.endDate.date.clone().add(1, 'd').format('YYYY-MM-DD'),
        duration: this.selectedDuration.title,
        shifts: this.shiftMenu.filter(x => x.isChecked).map(x => x.name),
        ...params
      };
      const queryParams = {
        startDate: this.startDate.date.format('YYYY-MM-DD'),
        duration: this.selectedDuration.title
      };

      this.router.navigate(
        ['.'],
        {
          relativeTo: route,
          queryParams: queryParams
        });
        console.log('reportFilterSubject---');
      this.reportService.initProductionSummary(filterRef);
    });
    this.route.queryParams.subscribe(params => {
      if (!this.isFirstLoaded) {
        if (params.startDate && params.duration) {
          this.startDate.date = moment(params.startDate);
          this.selectedDuration = this.durations.find(dd => dd.title === params.duration) || this.durations[0];
        }
        this.initDate();
        this.reportFilterSubject$.next({});
        this.isFirstLoaded = true;
      }
    });

    this.summaryList$ = this.reportService.productionSummary$
    .pipe(
      map((summaries) => {
        return this.machines.map((machine) => {
          const item = summaries.find(r => machine.id === r.id) || {};
          return {...item, machineName: machine.name};
        });
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.reportFilterSubject$.unsubscribe();
    this.machines$.unsubscribe();
  }

  onlyAllowDate = (date: Date) => {
    const day = date.getDay();
    if (this.selectedDuration.title === 'Week') {
      return day === 0;
    }
    return true;
  }

  initDate() {
    const startDate = this.startDate.date.clone();
    switch (this.selectedDuration.title) {
      case 'Week': {
        const dayWeek = startDate.weekday() % 7;
        this.startDate.date = startDate.clone().add(dayWeek * (-1), 'd');
        this.endDate.date = startDate.clone().add(6 -  dayWeek, 'd');
        this.customDurationLength = 1;
        this.customSelectedDuration = 'Weeks';
        break;
      }
      case 'Month': {
        const dayMonth =  startDate.date();
        const month = startDate.daysInMonth();
        this.startDate.date = startDate.clone().add(dayMonth * (-1) + 1, 'd');
        this.endDate.date = startDate.clone().add(month - dayMonth, 'd');
        this.customDurationLength = 1;
        this.customSelectedDuration = 'Months';
        break;
      }
      case 'Custom': {
        let duration: Duration = 'd';
        if (this.customSelectedDuration === 'Months') {
          duration = 'M';
        } else if (this.customSelectedDuration === 'Weeks') {
          duration = 'w';
        }
        const newDate = startDate.add(this.customDurationLength, duration);
        this.endDate.date = newDate.clone().add(-1, 'd');
        break;
      }
      default: {
        this.endDate.date = startDate;
        this.customDurationLength = 1;
        this.customSelectedDuration = 'Days';
        break;
      }
    }

    this.formStartDate = new FormControl(this.startDate.date.format());
  }

  calculateEndDate() {
    const mainDate = this.startDate.date.clone();
    switch (this.selectedDuration.title) {
      case 'Week': {
        this.endDate.date = mainDate.add(6, 'd');
        break;
      }
      case 'Month': {
        const monthDays = mainDate.daysInMonth();
        this.endDate.date = mainDate.add(monthDays, 'd');
        break;
      }
      case 'Custom': {
        break;
      }
      default: {
        this.endDate.date = mainDate.add(1, 'd');
        break;
      }
    }
  }

  onChangeDate() {
    this.startDate.date = moment(this.formStartDate.value);
    this.calculateEndDate();
    this.reportFilterSubject$.next({});
  }

  onAddDate(addVal) {
    let duration: Duration = 'd';
    let durationLength = addVal;
    switch (this.selectedDuration.title) {
      case 'Week': {
        duration = 'w';
        break;
      }
      case 'Month': {
        duration = 'M';
        break;
      }
      case 'Custom': {
        if (this.customSelectedDuration === 'Weeks') {
          duration = 'w';
        } else if (this.customSelectedDuration === 'Months') {
          duration = 'M';
        }
        durationLength = addVal * this.customDurationLength;
        break;
      }
      default: {
        duration = 'd';
        break;
      }
    }

    this.startDate.date = this.startDate.date.clone().add(durationLength, duration);
    this.endDate.date = this.endDate.date.clone().add(durationLength, duration);
    this.formStartDate = new FormControl(this.startDate.date.format());
    this.reportFilterSubject$.next({});
  }

  onClickDurationItem(item) {
    this.selectedDuration.selected = false;
    item.selected = true;
    this.selectedDuration = item;
    if (item.title !== 'Custom') {

    }
    this.initDate();
    this.reportFilterSubject$.next({});
  }

  onClickShiftMenuItem(item) {
    item.isChecked = !item.isChecked;
    this.reportFilterSubject$.next({ shifts: this.shiftMenu.filter(x => x.isChecked).map(x => x.name) });
    this.getShiftMenuTitle();
  }

  getShiftMenuTitle() {
    let count = 0;
    this.shiftMenu.map((menu) => {
      if (menu.isChecked && !count) {
        this.shiftMenuTitle = menu.name;
        count++;
      } else if (menu.isChecked && count) {
        this.shiftMenuTitle += ` & ${menu.name}`;
        count++;
      }
    });

    if (count === this.shiftMenu.length) {
      this.shiftMenuTitle = 'All';
    }
  }

  isAllMchinesIndeterminate () {
    return this.selectedMachinesNum > 0 &&  this.selectedMachinesNum < this.machines.length;
  }

  onClickMachineMenuItem(index) {  // still needs to adjust visable list
    if (index === -1) {
      this.allMachineItem = {...this.allMachineItem, isChecked: !this.allMachineItem.isChecked};
      this.checkedAllMachines(this.allMachineItem.isChecked);
    } else {
      this.machines[index] = {...this.machines[index], isChecked: !this.machines[index].isChecked};
      if (this.machines[index].isChecked) {
        this.selectedMachinesNum++;
      } else {
        this.selectedMachinesNum--;
      }
      this.machineIndeterminate = this.isAllMchinesIndeterminate();

      this.allMachineItem.isChecked = this.selectedMachinesNum === this.machines.length;
    }
  }

  checkedAllMachines(flag) {
    this.machines = this.machines.map((machine) => {
      return { ...machine, isChecked: flag};
    });
    this.machineIndeterminate = false;
    this.selectedMachinesNum = flag ? this.machines.length : 0;
  }

  openCustomDateModal() {
    const dialogRef = this.dialog.open(CustomDateModalComponent, {
      panelClass: ['custom-date-dialog', 'custom-dialog'],
      height: '300px',
      width: '500px',
      data: {
        durationLength: this.customDurationLength,
        startDate: this.startDate.date,
        endDate: this.endDate.date,
        selectedDuration: this.customSelectedDuration
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data) {
        const {startDate, endDate, durationLength, selectedDuration} = result.data;
        this.startDate.date = startDate.clone();
        this.endDate.date = endDate.clone();
        this.customDurationLength = durationLength;
        this.customSelectedDuration = selectedDuration;
        this.formStartDate = new FormControl(this.startDate.date.format());
        this.reportFilterSubject$.next({});
      }
    });
  }

  openPrintPreview() {
    const factoryName = 'AMS STUD';
    this.dialog.open(PrintPreviewDialogComponent, {
      panelClass: ['print-preview-dialog', 'custom-dialog'],
      maxWidth: '95vw',
      data: {
        summaryList: this.summaryList$,
        duration: this.selectedDuration.title,
        startDate: this.startDate.date,
        endDate: this.endDate.date,
        shift: this.shiftMenuTitle,
        factoryName: factoryName,
        machines: this.machines
      }
    });
  }

}
