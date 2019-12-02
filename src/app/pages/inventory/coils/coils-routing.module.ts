import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoilsComponent } from './coils.component';
import { CoilsListComponent } from './components/coils-list/coils-list.component';
import { CoilDetailComponent } from './components/coil-detail/coil-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CoilsComponent,
    children: [
      {
        path: '',
        component: CoilsListComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: CoilDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoilsRoutingModule {
}
