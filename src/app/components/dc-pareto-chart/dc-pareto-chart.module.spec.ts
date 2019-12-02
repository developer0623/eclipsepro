import { DcParetoChartModule } from './dc-pareto-chart.module';

describe('DcParetoChartModule', () => {
  let dcParetoChartModule: DcParetoChartModule;

  beforeEach(() => {
    dcParetoChartModule = new DcParetoChartModule();
  });

  it('should create an instance', () => {
    expect(dcParetoChartModule).toBeTruthy();
  });
});
