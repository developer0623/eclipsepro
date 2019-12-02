import { AndonConfigurationModule } from './andon-configuration.module';

describe('AndonConfigurationModule', () => {
  let andonConfigurationModule: AndonConfigurationModule;

  beforeEach(() => {
    andonConfigurationModule = new AndonConfigurationModule();
  });

  it('should create an instance', () => {
    expect(andonConfigurationModule).toBeTruthy();
  });
});
