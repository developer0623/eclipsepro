import { DowntimeEditorModule } from './downtime-editor.module';

describe('DowntimeEditorModule', () => {
  let downtimeEditorModule: DowntimeEditorModule;

  beforeEach(() => {
    downtimeEditorModule = new DowntimeEditorModule();
  });

  it('should create an instance', () => {
    expect(downtimeEditorModule).toBeTruthy();
  });
});
