import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionExplorerComponent } from './production-explorer.component';


const routes: Routes = [
  {
    path: '',
    component: ProductionExplorerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionExplorerRoutingModule {
}
