import { Action } from '@ngrx/store';
import { SIGNALR_CONNECTED, SIGNALR_DISCONNECTED, ActionsUnion } from './actions';


const initialState = { connected: false, connectionId: '' };

function SignalRConnection(state: State = initialState, action: ActionsUnion): State {
   switch (action.type) {
      case SIGNALR_CONNECTED: return { connectionId: action.payload, connected: true };
      case SIGNALR_DISCONNECTED: return initialState;
   }
   return state;
}

export interface State {
   connectionId: string;
   connected: boolean;
}

export const reducer = SignalRConnection;
