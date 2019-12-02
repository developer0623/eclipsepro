import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableComponent } from './editable.component';
import { EditModeDirective } from './directives/edit-mode.directive';
import { EditOnEnterDirective } from './directives/edit-on-enter.directive';
import { ViewModeDirective } from './directives/view-mode.directive';
import { FocusableDirective } from './directives/focusable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EditableComponent, EditModeDirective, EditOnEnterDirective, ViewModeDirective, FocusableDirective],
  exports: [EditableComponent, EditModeDirective, EditOnEnterDirective, ViewModeDirective, FocusableDirective]
})
export class EditableModule { }
