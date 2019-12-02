import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { InventoryService } from 'app/services/inventory.service';
import { IMaterialDto, ICoilDto, IConsumptionHistory } from 'app/models/dto';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss']
})
export class MaterialDetailComponent implements OnInit, OnDestroy {
  id = '';
  details$: any;
  coils: ICoilDto[] = [];
  material: IMaterialDto;
  visibleCoilColumns = ['coilId', 'description', 'lengthRemainingFt', 'lengthUsedFt', 'lengthNonExemptScrapFt',
    'dateIn', 'vendorName'
  ];
  visibleHistoryColumns = ['productionDate', 'goodPieceCount', 'goodFeet', 'scrapFeet', 'scrapPct',
    'runMinutes', 'machineNumber', 'orderCode', 'toolingCode', 'coilSerialNumber', 'customerName'
  ];
  coilsSource: MatTableDataSource<ICoilDto> | null = new MatTableDataSource();
  historiesSource: MatTableDataSource<IConsumptionHistory> | null = new MatTableDataSource();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.details$ = this.inventoryService.onGetDetailByMaterilCode(this.id)
      .pipe(filter (x => x.coilType !== undefined))
      .subscribe((results => {
        this.material = results.coilType;
        this.coilsSource.data = results.coils;
        this.historiesSource.data = results.histories;
      }));
    });
  }

  gotoCoilDetail(coil) {
    this.router.navigate(['../inventory/materials', coil.id]);
  }

  ngOnDestroy() {
    this.details$.unsubscribe();
  }

}
