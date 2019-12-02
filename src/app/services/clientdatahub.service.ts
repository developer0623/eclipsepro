import { hubConnection } from 'signalr-no-jquery';
import { Injectable } from '@angular/core';
import { Put, Del, Initialize } from 'app/store/subscriptions/actions';
import { Store } from '@ngrx/store';
import { SignalrConnectedAction, SignalrDisconnectedAction } from '../store/signalr/actions';

/** This service's job is to map signalr calls received from the
 * server, to actions that are dispatched on the store. */
@Injectable()
export class ClientDataHubService {
   constructor(private store: Store<any>) {
      const connection = hubConnection('http://localhost:8080/');
      const hubProxy = connection.createHubProxy('clientDataHub');

      hubProxy.on('objectPut', (collection, data) => {
         store.dispatch(new Put(collection, data));
      });

      hubProxy.on('objectDelete', (collection, id) => {
         let realid = id.split('/')[1];
         if (!realid) {
            realid = id;
         }
         store.dispatch(new Del(collection, realid));
      });

      hubProxy.on('objectBatchPut', (collection, batch, serverTime) => {
         store.dispatch(new Initialize<any>(collection, batch));
      });

      connection.disconnected(() => {
         store.dispatch(new SignalrDisconnectedAction());
      });

      // Actually start up the connection
      connection.start().done(() => {
         store.dispatch(new SignalrConnectedAction(connection.id));
      });
   }
}
