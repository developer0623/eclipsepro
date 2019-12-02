import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AndonConfigurationComponent } from './andon-configuration.component';


const routes: Routes = [
  {
    path: '',
    component: AndonConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndonConfigurationRoutingModule {
}
