import { PerformanceStandardsModule } from './performance-standards.module';

describe('PerformanceStandardsModule', () => {
  let performanceStandardsModule: PerformanceStandardsModule;

  beforeEach(() => {
    performanceStandardsModule = new PerformanceStandardsModule();
  });

  it('should create an instance', () => {
    expect(performanceStandardsModule).toBeTruthy();
  });
});
