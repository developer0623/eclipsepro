import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetricConfigurationComponent } from './metric-configuration.component';


const routes: Routes = [
  {
    path: '',
    component: MetricConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetricConfigurationRoutingModule {
}
