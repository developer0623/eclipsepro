import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-material-detail-header',
  templateUrl: './material-detail-header.component.html',
  styleUrls: ['./material-detail-header.component.scss']
})
export class MaterialDetailHeaderComponent implements OnInit {
  @Input('code') code = '';
  @Input('description') description = '';
  @Input('balance') balance = 0;

  constructor() { }

  ngOnInit() {
  }

}
