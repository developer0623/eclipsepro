import { ScheduleEditorModule } from './schedule-editor.module';

describe('ScheduleEditorModule', () => {
  let scheduleEditorModule: ScheduleEditorModule;

  beforeEach(() => {
    scheduleEditorModule = new ScheduleEditorModule();
  });

  it('should create an instance', () => {
    expect(scheduleEditorModule).toBeTruthy();
  });
});
