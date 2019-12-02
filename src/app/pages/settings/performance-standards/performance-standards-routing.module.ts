import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceStandardsComponent } from './performance-standards.component';


const routes: Routes = [
  {
    path: '',
    component: PerformanceStandardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceStandardsRoutingModule {
}
