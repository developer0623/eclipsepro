import { DcTimebarChartModule } from './dc-timebar-chart.module';

describe('DcTimebarChartModule', () => {
  let dcTimebarChartModule: DcTimebarChartModule;

  beforeEach(() => {
    dcTimebarChartModule = new DcTimebarChartModule();
  });

  it('should create an instance', () => {
    expect(dcTimebarChartModule).toBeTruthy();
  });
});
