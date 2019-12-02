import { CoilsModule } from './coils.module';

describe('CoilsModule', () => {
  let coilsModule: CoilsModule;

  beforeEach(() => {
    coilsModule = new CoilsModule();
  });

  it('should create an instance', () => {
    expect(coilsModule).toBeTruthy();
  });
});
