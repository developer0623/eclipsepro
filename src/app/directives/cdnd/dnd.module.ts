import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndDraggableDirective } from './dnd-draggable.directive';
import { DndDropzoneDirective, DndPlaceholderRefDirective } from './dnd-dropzone.directive';
import { DndHandleDirective } from './dnd-handle.directive';

@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [
    DndDraggableDirective,
    DndDropzoneDirective,
    DndHandleDirective,
    DndPlaceholderRefDirective
  ],
  exports: [
    DndDraggableDirective,
    DndDropzoneDirective,
    DndHandleDirective,
    DndPlaceholderRefDirective
  ]
} )
export class DndModule {
}
