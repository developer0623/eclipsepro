import { Action } from '@ngrx/store';

export const SIGNALR_CONNECTED = '[SIGNALR_CONNECTED]';
export const SIGNALR_DISCONNECTED = '[SIGNALR_DISCONNECTED]';

export class SignalrConnectedAction implements Action {
   readonly type = SIGNALR_CONNECTED;
   constructor(
      public payload: string
   ) { }
}

export class SignalrDisconnectedAction {
   readonly type = SIGNALR_DISCONNECTED;
}

export type ActionsUnion = SignalrConnectedAction | SignalrDisconnectedAction;
