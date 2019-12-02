import { TimebarChartModule } from './timebar-chart.module';

describe('TimebarChartModule', () => {
  let timebarChartModule: TimebarChartModule;

  beforeEach(() => {
    timebarChartModule = new TimebarChartModule();
  });

  it('should create an instance', () => {
    expect(timebarChartModule).toBeTruthy();
  });
});
