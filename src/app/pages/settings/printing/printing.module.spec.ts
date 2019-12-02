import { PrintingModule } from './printing.module';

describe('PrintingModule', () => {
  let printingModule: PrintingModule;

  beforeEach(() => {
    printingModule = new PrintingModule();
  });

  it('should create an instance', () => {
    expect(printingModule).toBeTruthy();
  });
});
