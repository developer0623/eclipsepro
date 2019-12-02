
import { Action } from '@ngrx/store';

export const INITIALIZE_MODULE = 'INITIALIZE_MODULE Alerts';

export class InitializeModule implements Action {
   readonly type = INITIALIZE_MODULE;
}
