import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bullet-chart-preview',
  templateUrl: './bullet-chart-preview.component.html',
  styleUrls: ['./bullet-chart-preview.component.scss']
})
export class BulletChartPreviewComponent implements OnInit {
  @Input('current') current;
  @Input('okLower') okLower;
  @Input('okUpper') okUpper;
  @Input('target') target;
  @Input('minValue') minValue;
  @Input('maxValue') maxValue;
  @Input('lowerIsBetter') lowerIsBetter;
  @Input('type') type;
  @Input('height') height;

  constructor() { }

  ngOnInit() {
  }

  scale(d) {
    let result = d * 100 / (this.maxValue - this.minValue);

    // Note: the result should never be negative
    if (result < 0) {
      result = 0;
    }

    return result;
  }

}
