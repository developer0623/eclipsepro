import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {selectSortedMachines} from 'app/store/dashboard/selectors';
import {selectProductionSummary} from 'app/store/reports/selectors';
import { InitProductionSummaryAction } from 'app/store/reports/actions';

import { RootState } from 'app/store/root.reducers';
import { IMachine, IProductionSummaryReportRecord  } from 'app/models/dto';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  productionSummary$: Observable<IProductionSummaryReportRecord[]>;

  constructor(private store: Store<RootState>) {
    this.productionSummary$ = store.select(selectProductionSummary);
  }
  getOriginMachines(): Observable<IMachine[]> {
    return this.store.select(selectSortedMachines);
  }

  initProductionSummary(filterRef) {
    this.store.dispatch(new InitProductionSummaryAction(filterRef));
  }
}
