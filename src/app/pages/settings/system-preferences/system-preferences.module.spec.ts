import { SystemPreferencesModule } from './system-preferences.module';

describe('SystemPreferencesModule', () => {
  let systemPreferencesModule: SystemPreferencesModule;

  beforeEach(() => {
    systemPreferencesModule = new SystemPreferencesModule();
  });

  it('should create an instance', () => {
    expect(systemPreferencesModule).toBeTruthy();
  });
});
