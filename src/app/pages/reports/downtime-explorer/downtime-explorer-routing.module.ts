import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DowntimeExplorerComponent } from './downtime-explorer.component';


const routes: Routes = [
  {
    path: '',
    component: DowntimeExplorerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DowntimeExplorerRoutingModule {
}
