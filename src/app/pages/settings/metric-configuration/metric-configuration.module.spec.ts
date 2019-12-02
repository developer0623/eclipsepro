import { MetricConfigurationModule } from './metric-configuration.module';

describe('MetricConfigurationModule', () => {
  let metricConfigurationModule: MetricConfigurationModule;

  beforeEach(() => {
    metricConfigurationModule = new MetricConfigurationModule();
  });

  it('should create an instance', () => {
    expect(metricConfigurationModule).toBeTruthy();
  });
});
