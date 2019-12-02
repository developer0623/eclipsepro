import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MachineListComponent } from './components/machine-list/machine-list.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MachineListComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: MachineDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
