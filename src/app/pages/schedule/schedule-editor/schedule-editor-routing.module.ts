import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEditorComponent } from './schedule-editor.component';
import { ScheduleDetailComponent } from './components/schedule-detail/schedule-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleEditorRoutingModule {
}
