import { ExperimentsModule } from './experiments.module';

describe('ExperimentsModule', () => {
  let experimentsModule: ExperimentsModule;

  beforeEach(() => {
    experimentsModule = new ExperimentsModule();
  });

  it('should create an instance', () => {
    expect(experimentsModule).toBeTruthy();
  });
});
