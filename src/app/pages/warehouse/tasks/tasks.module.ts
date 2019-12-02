import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from 'app/shared/material-components.module';
import { PipesModule } from 'app/pipes/pipes.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskHeaderComponent } from './components/task-header/task-header.component';
import { TaskActiveContentComponent } from './components/task-active-content/task-active-content.component';
import { TaskCompletedContentComponent } from './components/task-completed-content/task-completed-content.component';
import { TaskActiveFooterComponent } from './components/task-active-footer/task-active-footer.component';
import { TaskCurrentFooterComponent } from './components/task-current-footer/task-current-footer.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TasksRoutingModule,
    PipesModule
  ],
  declarations: [
    TasksComponent,
    TaskHeaderComponent,
    TaskActiveContentComponent,
    TaskCompletedContentComponent,
    TaskActiveFooterComponent,
    TaskCurrentFooterComponent,
    TaskItemComponent
  ]
})
export class TasksModule { }
