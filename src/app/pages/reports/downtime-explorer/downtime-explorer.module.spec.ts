import { DowntimeExplorerModule } from './downtime-explorer.module';

describe('DowntimeExplorerModule', () => {
  let downtimeExplorerModule: DowntimeExplorerModule;

  beforeEach(() => {
    downtimeExplorerModule = new DowntimeExplorerModule();
  });

  it('should create an instance', () => {
    expect(downtimeExplorerModule).toBeTruthy();
  });
});
