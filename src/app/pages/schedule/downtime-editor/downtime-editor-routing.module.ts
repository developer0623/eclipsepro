import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DowntimeEditorComponent } from './downtime-editor.component';


const routes: Routes = [
  {
    path: '',
    component: DowntimeEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DowntimeEditorRoutingModule {
}
