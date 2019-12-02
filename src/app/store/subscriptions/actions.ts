import { Action } from '@ngrx/store';
import * as Fx from './objects';

export const PUT = '[PUT]';
export const DEL = '[DEL]';
export const INITIALIZE = '[INITIALIZE]';
export const CHOP = '[CHOP]';
export const ADD_SUBSCRIPTION = '[ADD_SUBSCRIPTION]';
export const DEL_SUBSCRIPTION = '[DEL_SUBSCRIPTION]';
export const RESET = '[RESET]';

export class Reset implements Action {
      readonly type = RESET;
      constructor() { }
}

export class Put<T> implements Action {
      readonly type = PUT;
      constructor(
            public collection: string,
            public payload: T) { }
}

export class Del<T> implements Action {
      readonly type = DEL;
      constructor(
            public collection: string,
            public id: string) { }
}
export class Initialize<T> implements Action {
      readonly type = INITIALIZE;
      constructor(
            public collection: string,
            public payload: T[]) { }
}

export class Chop<T> implements Action {
      readonly type = CHOP;
      constructor(
            public collection: string,
            public subscriptions: Fx.Subscription<T>[]
      ) { }
}

export class AddSubscription<T> implements Action {
      readonly type = ADD_SUBSCRIPTION;
      constructor(
            public payload: Fx.Subscription<T>
      ) { }
}
export class DelSubscription<T> implements Action {
      readonly type = DEL_SUBSCRIPTION;
      constructor(
            public payload: Fx.Subscription<T>
      ) { }
}

export type All<T> = Put<T> | Del<T> | Initialize<T> | Chop<T>;
export type SubscriptionAction<T> = AddSubscription<T> | DelSubscription<T>;

export type ActionsUnion<T> = Put<T> | Del<T> | Initialize<T> | Chop<T> | AddSubscription<T> | DelSubscription<T>;
