import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { InventoryService } from 'app/services/inventory.service';
import { IMaterialDto } from 'app/models/dto';

export interface HeaderEl {
  name: string;
  property: string;
  placeholder: string;
}

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss']
})
export class MaterialsListComponent implements OnInit, AfterViewInit, OnDestroy {
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  coilTypes: IMaterialDto[];
  coilTypes$: any;
  visibleColumns = ['materialCode', 'description', 'type', 'color', 'gauge', 'thicknessIn',
    'widthIn', 'onHandFt', 'demandFt', 'balanceFt'
  ];

  columns: HeaderEl[] = [
    { property: 'materialCode', name: 'Material Code', placeholder: 'Material Code' },
    { property: 'description', name: 'Description', placeholder: 'Description' },
    { property: 'type', name: 'Type', placeholder: 'Type' },
    { property: 'color', name: 'Color', placeholder: 'Color' },
    { property: 'gauge', name: 'Gauge', placeholder: 'Gauge' },
    { property: 'thicknessIn', name: 'Thickness', placeholder: 'Thickness'},
    { property: 'widthIn', name: 'Width', placeholder: 'Width' },
    { property: 'onHandFt', name: 'On Hand', placeholder: 'On Hand' },
    { property: 'demandFt', name: 'Demand', placeholder: 'Demand' },
    { property: 'balanceFt', name: 'Balance', placeholder: 'Balance' }
  ];
  pageSize = 10;
  dataSource: MatTableDataSource<IMaterialDto> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.coilTypes$ = this.inventoryService.coilTyles$.subscribe((coilTypes) => {
      this.coilTypes = coilTypes;
      this.dataSource.data = coilTypes;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.coilTypes$.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  gotoDetail(row) {
    this.router.navigate(['../inventory/materials', row.id]);
  }

}
