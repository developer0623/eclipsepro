import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root.reducers';
import {  InitProductionExplorerAction } from 'app/store/productionExplorer/actions';
import {selectProductionExplorer} from 'app/store/productionExplorer/selectors';

const daysBack = 7;

@Injectable({
  providedIn: 'root'
})
export class ProductionExplorerService {
  startDate = new Date(2017, 11, 10);
  endDate = new Date();
  explorerDataSub$;

  constructor(private store: Store<RootState>) {
    this.store.dispatch(new InitProductionExplorerAction({startDate: this.startDate, endDate: this.endDate}));
    this.explorerDataSub$ = store.select(selectProductionExplorer);
  }
}
