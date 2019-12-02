import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionSummaryComponent } from './production-summary.component';


const routes: Routes = [
  {
    path: '',
    component: ProductionSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionSummaryRoutingModule {
}
