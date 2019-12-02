import { SummaryPipesModule } from './summary-pipes.module';

describe('SummaryPipesModule', () => {
  let summaryPipesModule: SummaryPipesModule;

  beforeEach(() => {
    summaryPipesModule = new SummaryPipesModule();
  });

  it('should create an instance', () => {
    expect(summaryPipesModule).toBeTruthy();
  });
});
