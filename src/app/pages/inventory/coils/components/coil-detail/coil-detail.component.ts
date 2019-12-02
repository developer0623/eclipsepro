import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { InventoryService } from 'app/services/inventory.service';
import { ICoilDto, IConsumptionHistory } from 'app/models/dto';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-coil-detail',
  templateUrl: './coil-detail.component.html',
  styleUrls: ['./coil-detail.component.scss']
})
export class CoilDetailComponent implements OnInit, OnDestroy {
  id = '';
  coil: ICoilDto;
  visibleHistoryColumns = ['productionDate', 'goodPieceCount', 'goodFeet', 'scrapFeet', 'scrapPct',
    'runMinutes', 'machineNumber', 'orderCode', 'toolingCode', 'customerName'
  ];
  details$: any;
  historiesSource: MatTableDataSource<IConsumptionHistory> | null = new MatTableDataSource();

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.details$ = this.inventoryService.onCoilDetailById(this.id)
      .pipe(filter (x => x.coil !== undefined))
      .subscribe((results => {
        this.coil = results.coil;
        this.historiesSource.data = results.histories;
      }));
    });
  }

  ngOnDestroy() {
    this.details$.unsubscribe();
  }

}
