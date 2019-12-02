import { NgModule } from '@angular/core';
import {UnitsFormatPipe} from './units-format.pipe';
import { UserDisplayUnitsPipe } from './user-display-units.pipe';
import { TaskLenghFilterPipe } from './task-lengh-filter.pipe';
import { TimeSpanPipe } from './time-span.pipe';
import { FixedNumPipe } from './fixed-num.pipe';
import { AmsTimeAgoPipe } from './ams-time-ago.pipe';
import { ShowInMiniPipe } from './show-in-mini.pipe';
import { SummaryUnitPipe } from './summary-unit.pipe';
import { TaskActiveAgoPipe } from './task-active-ago.pipe';
import { RepeatTextPipe } from './repeat-text.pipe';
import { BuildDurationPipe } from './build-duration.pipe';
import { TaskTimeAgoPipe } from './task-time-ago.pipe';

@NgModule({
  imports: [],
  declarations: [
    UnitsFormatPipe,
    UserDisplayUnitsPipe,
    TaskLenghFilterPipe,
    TimeSpanPipe,
    FixedNumPipe,
    AmsTimeAgoPipe,
    ShowInMiniPipe,
    SummaryUnitPipe,
    TaskActiveAgoPipe,
    RepeatTextPipe,
    BuildDurationPipe,
    TaskTimeAgoPipe
  ],
  exports: [
    UnitsFormatPipe,
    UserDisplayUnitsPipe,
    TaskLenghFilterPipe,
    TimeSpanPipe,
    FixedNumPipe,
    AmsTimeAgoPipe,
    ShowInMiniPipe,
    SummaryUnitPipe,
    TaskActiveAgoPipe,
    RepeatTextPipe,
    BuildDurationPipe,
    TaskTimeAgoPipe
  ]
})
export class PipesModule {}
