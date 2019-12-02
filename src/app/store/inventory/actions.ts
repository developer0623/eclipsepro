import { Action } from '@ngrx/store';

export const INITIALIZE_MODULE_INVENTORY = 'INITIALIZE_MODULE_INVENTORY';

export class InitializeModuleInventory implements Action {
  readonly type = INITIALIZE_MODULE_INVENTORY;
}
