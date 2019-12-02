import { UpdateModule } from './update.module';

describe('UpdateModule', () => {
  let updateModule: UpdateModule;

  beforeEach(() => {
    updateModule = new UpdateModule();
  });

  it('should create an instance', () => {
    expect(updateModule).toBeTruthy();
  });
});
