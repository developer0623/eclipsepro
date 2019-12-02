import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coil-detail-header',
  templateUrl: './coil-detail-header.component.html',
  styleUrls: ['./coil-detail-header.component.scss']
})
export class CoilDetailHeaderComponent implements OnInit {
  @Input('id') id = '';
  @Input('description') description = '';
  @Input('balance') balance = 0;
  @Input('material') material = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoMaterialDetail(material) {
    this.router.navigate(['../inventory/materials', material]);
  }

}
