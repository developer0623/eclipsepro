import { ProductionExplorerModule } from './production-explorer.module';

describe('ProductionExplorerModule', () => {
  let productionExplorerModule: ProductionExplorerModule;

  beforeEach(() => {
    productionExplorerModule = new ProductionExplorerModule();
  });

  it('should create an instance', () => {
    expect(productionExplorerModule).toBeTruthy();
  });
});
