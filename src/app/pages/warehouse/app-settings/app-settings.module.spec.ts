import { AppSettingsModule } from './app-settings.module';

describe('AppSettingsModule', () => {
  let appSettingsModule: AppSettingsModule;

  beforeEach(() => {
    appSettingsModule = new AppSettingsModule();
  });

  it('should create an instance', () => {
    expect(appSettingsModule).toBeTruthy();
  });
});
