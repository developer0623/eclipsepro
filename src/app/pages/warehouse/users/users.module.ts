import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material-components.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    UsersRoutingModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
