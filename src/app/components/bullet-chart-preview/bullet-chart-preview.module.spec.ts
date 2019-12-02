import { BulletChartPreviewModule } from './bullet-chart-preview.module';

describe('BulletChartPreviewModule', () => {
  let bulletChartPreviewModule: BulletChartPreviewModule;

  beforeEach(() => {
    bulletChartPreviewModule = new BulletChartPreviewModule();
  });

  it('should create an instance', () => {
    expect(bulletChartPreviewModule).toBeTruthy();
  });
});
