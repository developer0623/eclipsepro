import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialsComponent } from './materials.component';
import { MaterialsListComponent } from './components/materials-list/materials-list.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialsComponent,
    children: [
      {
        path: '',
        component: MaterialsListComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: MaterialDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialsRoutingModule {
}
