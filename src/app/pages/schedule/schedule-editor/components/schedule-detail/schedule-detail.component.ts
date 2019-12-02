import { Component, OnInit, Input, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { tap, refCount, publishReplay, map } from 'rxjs/operators';
import { ScheduleService } from 'app/services/schedule.service';
import { IAvailableJobColumn } from 'app/models/dto';
import * as moment from 'moment';
import * as _ from 'lodash';
import { PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-schedule-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit, OnDestroy {
  @Input('machineId') machineId = '';
  @ViewChild('assScrollBar') assScrollBar?: PerfectScrollbarComponent;
  availableJobColumns: IAvailableJobColumn[] = [];
  assignedJobs: Array<any> = [];
  jobsOnMachine: any[] = [];
  scheduledJobCount = 0;
  numberOfJobsonMachine = 0;
  containerHeight = 0;
  dateAndTime: any[] = [];
  movedType = 'ass';
  movedPos = 0;
  availableJobColumns_;
  dataSubsSub_;
  selectScheduledJobsOldTree$;
  assJobsScrollPosY = 0;
  availableJobsGridData$: Observable<any>;
  constructor(private scheduleService: ScheduleService) { }


  ngOnDestroy() {
    this.availableJobColumns_.unsubscribe();
    this.dataSubsSub_.unsubscribe();
  }

  ngOnInit() {
    this.scheduleService.initScheduleData(this.machineId);
    this.availableJobColumns_ = this.scheduleService.availableJobColumns$
     .pipe(
       tap(availableJobColumns => {
         if (availableJobColumns.length > 0) {
          this.availableJobColumns = availableJobColumns;
         }
       })
     ).subscribe();

    this.dataSubsSub_ = this.scheduleService
      .takeSubscriptionsForMachine(Number(this.machineId))
      .subscribe();

    //  let filter$ = this.filterText$.debounce(250)
    //      .combineLatest(store.SelectAvailableJobColumns(), (filterText, columns) => {
    //         if (filterText.trim().length === 0)
    //            return _ => true;
    //         return (job: IJobSummaryDto) => {
    //            return columns.filter(c => c.ischecked)
    //               .map(col => job[col.fieldName])
    //               .join().toString().toLowerCase()
    //               .indexOf(filterText.toLowerCase()) > -1;
    //         };
    //      });

    this.availableJobsGridData$ = this.scheduleService
      .selectAvailableJobsOldTree(Number(this.machineId), of(x => true))
      .pipe(
        tap(x => console.log('availableJobsTreeChange:', x))
        , publishReplay(1)
        , refCount()
      );

    this.selectScheduledJobsOldTree$ = this.scheduleService.selectScheduledJobsOldTree(Number(this.machineId))
      .pipe(
        map(scheJobsTree => {
          const dta = scheJobsTree.dates.map(d => {
            const md = moment(d);
            return { date: md.format('YYYY-MM-DD'), time: md.format('hh:mm A') };
          });
          const getMachineStyle = () => {
            if (scheJobsTree.machineJobsCount === 0) {
              return {
                backgroundColor: 'transparent'
              };
            }

            if (this.assJobsScrollPosY + 15 > scheJobsTree.machineJobsCount * 100) {
              return {
                backgroundColor: 'transparent'
              };
            }

            return {
              backgroundColor: '#CCCCCC'
            };
          };

          return {
            numberOfJobsonMachine: scheJobsTree.machineJobsCount,
            containerHeight: scheJobsTree.machineJobsCount * 105,
            dateAndTime: _(dta).groupBy('date')
              .map((items, date) => ({ date: date, times: _.map(items, 'time') }))
              .value(),
            assignedJobs: scheJobsTree.normalAssignedJobs,
            scheduledJobCount: scheJobsTree.totalCount,
            machineStyle: getMachineStyle()
          };
        })
        , tap(x => console.log('scheduledJobsTreeChanged:', x))
        , publishReplay(1)
        , refCount()
      );
  }

  onChangePosition() {
    const assScr: any = this.assScrollBar.directiveRef.ps();
    this.assJobsScrollPosY = assScr.lastScrollTop;
  }

  getHeight(height) {
    if (height) {
      return {
        height: `${height}px`
      };
    }
    return {
      height: 0
    };
  }

  getMaxHeight(height) {
    if (height) {
      return {
        'max-height': `${height}px`
      };
    }
    return {
      'max-height': 'auto'
    };
  }

  getMaxHeightWithStyle(height, style) {
    if (height) {
      return {
        ...style,
        'max-height': `${height}px`
      };
    }
    return {
      ...style,
      'max-height': 'auto'
    };
  }

  dragOnAvailJobs(event, node) {
    if (this.movedType === 'machine') {
      this.moveFromAvaToSch(node, true);
    } else {
      this.moveFromAvaToSch(node, false);
    }
  }
  dragOnScheduleJobs(event, index, items) {
    if (this.movedType === 'ass') {
      this.moveFromSchToSch(items, false);
    } else if (this.movedType === 'machine') {
      this.moveFromSchToSch(items, true);
    } else {
      this.moveFromSchToAva(items);
    }
  }

  dropToSchedule(event) {
    console.log('dropToSchedule', event);
    this.movedType = 'ass';
    this.movedPos = event.index;
  }

  dropToAvailableJobs(event) {
    this.movedType = 'ava';
  }
  dropToMachine() {
    this.movedType = 'machine';
    this.movedPos = this.numberOfJobsonMachine;
  }

  moveFromAvaToSch(node, toMachine) {
    this.scheduleService.moveFromAvaToSch({
      availableJobIds: node.ids,
      machineId: this.machineId,
      requestedSequenceNumber: this.movedPos,
      isOnMachine: toMachine
    });
  }
  moveFromSchToAva(jobs) {
    this.scheduleService.moveFromSchToAva({
      scheduledJobIds: jobs.map(i => i.jobId),
      machineId: this.machineId
    });

  }
  moveFromSchToSch(jobs, toMachine) {
    this.scheduleService.moveFromSchToSch({
      scheduledJobIds: jobs.map(i => i.jobId),
      requestedSequenceNumber: this.movedPos,
      machineId: this.machineId,
      isOnMachine: toMachine
    });
  }

  onDbClickScheduled(jobs) {
    this.scheduleService.moveFromSchToAva({
         scheduledJobIds: jobs.map(i => i.jobId),
         machineId: this.machineId
      });
  }

  onDbClickAvailableItem(node) {
    this.scheduleService.moveFromAvaToSch({
        availableJobIds: node.ids,
        machineId: this.machineId,
        isOnMachine: false
     });
  }

  onDbClickAvailableJobsHeader(item) {

  }

  onAvailableJobColumnReorder() {

  }

  dropOnAvailableHeader() {

  }

}
