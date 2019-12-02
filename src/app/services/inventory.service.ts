import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root.reducers';
import { InitializeModuleInventory } from 'app/store/inventory/actions';
import {
  selectCoils, selectCoilTypes, selectConsumHistory,
  selectDetailByMaterialCode, selectDetailByCoilId
} from 'app/store/inventory/selectors';
import {
  ICoilDto,
  IMaterialDto,
  IConsumptionHistory,
  ILocation
} from 'app/models/dto';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  coils$: Observable<ICoilDto[]>;
  coilTyles$: Observable<IMaterialDto[]>;
  consumHistories$: Observable<IConsumptionHistory[]>;

  constructor(private store: Store<RootState>) {
    store.dispatch(new InitializeModuleInventory());
    this.coils$ = store.select(selectCoils);
    this.coilTyles$ = store.select(selectCoilTypes);
    this.consumHistories$ = store.select(selectConsumHistory);
  }

  onGetDetailByMaterilCode(code: string) {
    return this.store.select(selectDetailByMaterialCode(code));
  }

  onCoilDetailById(id: string) {
    return this.store.select(selectDetailByCoilId(id));
  }
}
