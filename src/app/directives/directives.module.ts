import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagDirective } from './feature-flag.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ FeatureFlagDirective ],
  exports: [ FeatureFlagDirective ]
})
export class DirectivesModule { }
