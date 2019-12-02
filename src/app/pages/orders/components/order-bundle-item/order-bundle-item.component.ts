import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-bundle-item',
  templateUrl: './order-bundle-item.component.html',
  styleUrls: ['./order-bundle-item.component.scss']
})
export class OrderBundleItemComponent implements OnInit {
  @Input('isdetail') isdetail = false;
  @Input('item') item;
  @Output() valueChanged = new EventEmitter();

  percent;

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.valueChanged.emit();
  }
  getWidth = (val) => {
    const style = {width: ''};
    switch (val) {
      case 0:
        style.width = (this.item.weightLbs * 100 / this.item.maxWeightLbs).toFixed(0) + '%';
        break;
      case 1:
        style.width = (this.item.pieces * 100 / this.item.maxPieces).toFixed(0) + '%';
        break;
      case 2:
        style.width = (this.item.bundleMaxLengthIn * 100 / this.item.orderMaxLengthIn).toFixed(0) + '%';
        break;
      case 3:
        style.width = (this.item.bundleMinLengthIn * 100 / this.item.orderMaxLengthIn).toFixed(0) + '%';
        break;
    }
    return style;
  }

}
