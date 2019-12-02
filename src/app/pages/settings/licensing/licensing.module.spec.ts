import { LicensingModule } from './licensing.module';

describe('LicensingModule', () => {
  let licensingModule: LicensingModule;

  beforeEach(() => {
    licensingModule = new LicensingModule();
  });

  it('should create an instance', () => {
    expect(licensingModule).toBeTruthy();
  });
});
