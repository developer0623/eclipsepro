import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from 'app/models/dto';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root.reducers';
import { selectTasksModel } from 'app/store/warehouse/selectors';
import { InitializeModuleWarehouse } from 'app/store/warehouse/actions';

interface Task {
  readyTasks: ITask[];
  readyTasksRemaining: number;
  completedTasks: ITask[];
  completedTasksRemaining: number;
  activeTasks: ITask[];
  activeTasksRemaining: number;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks$: Observable<Task>;
  comFilterDate = new Date();
  comFilterDateMoment = moment(this.comFilterDate);
  year = '';
  date = '';

  constructor(private store: Store<RootState>) {

   store.dispatch(new InitializeModuleWarehouse());
   this.tasks$ = store.select(selectTasksModel);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  getDate() {
    this.date = this.comFilterDateMoment.format('MMM Do');
    this.year = this.comFilterDateMoment.format('YYYY');
  }

  onChangeDate(days) {
    this.comFilterDateMoment = moment(this.comFilterDate);
    console.log('days----', this.comFilterDate);
  }

}
