import { ProductionSummaryModule } from './production-summary.module';

describe('ProductionSummaryModule', () => {
  let productionSummaryModule: ProductionSummaryModule;

  beforeEach(() => {
    productionSummaryModule = new ProductionSummaryModule();
  });

  it('should create an instance', () => {
    expect(productionSummaryModule).toBeTruthy();
  });
});
