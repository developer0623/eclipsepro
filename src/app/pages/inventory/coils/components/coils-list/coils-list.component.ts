import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { InventoryService } from 'app/services/inventory.service';
import { ICoilDto } from 'app/models/dto';

export interface HeaderEl {
  name: string;
  property: string;
  placeholder: string;
}

@Component({
  selector: 'app-coils-list',
  templateUrl: './coils-list.component.html',
  styleUrls: ['./coils-list.component.scss']
})
export class CoilsListComponent implements OnInit, AfterViewInit, OnDestroy {

  coils: ICoilDto[];
  coils$: any;
  visibleColumns = ['coilId', 'materialCode', 'description', 'lengthRemainingFt', 'lengthUsedFt', 'lengthNonExemptScrapFt',
    'dateIn', 'locationId', 'vendorName'
  ];

  columns: HeaderEl[] = [
    { property: 'coilId', name: 'Coil ID', placeholder: 'Coil ID' },
    { property: 'materialCode', name: 'Material', placeholder: 'Material' },
    { property: 'description', name: 'Description', placeholder: 'Description' },
    { property: 'lengthRemainingFt', name: 'Remaining', placeholder: 'Remaining' },
    { property: 'lengthUsedFt', name: 'Used', placeholder: 'Used' },
    { property: 'lengthNonExemptScrapFt', name: 'Scrap', placeholder: 'Scrap' },
    { property: 'dateIn', name: 'Age', placeholder: 'Age' },
    { property: 'locationId', name: 'Location', placeholder: 'Location' },
    { property: 'vendorName', name: 'Vendor', placeholder: 'Vendor' },
  ];
  pageSize = 10;
  dataSource: MatTableDataSource<ICoilDto> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.coils$ = this.inventoryService.coils$.subscribe(coils => {
      this.coils = coils;
      this.dataSource.data = coils;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.coils$.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  gotoCoilDetail(row) {
    this.router.navigate(['../inventory/coils', row.coilId]);
  }

  gotoMaterialDetail(row) {
    this.router.navigate(['../inventory/materials', row.materialCode]);
  }

}
