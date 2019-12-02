import { PUT, DEL, INITIALIZE, CHOP, All } from './actions';
import * as Fx from './objects';

/**
Note this is a reducer constructor. It creates a reducer that works against the standard `PUT` / `DELETE`
pattern.
*/
export function collectionReducer<T extends { id: string | number }>(collection: string) {
    const _putOne = (state: Array<T>, payload: T) => {
        if (typeof payload !== 'object') {
            console.error('`payload` is not an object', payload);
            return state;
        }
        if (!('id' in payload)) {
            console.error(payload);
            throw new Error('object in collection \'' + collection + '\' does not have \'id\' property');
        }
        const tobj = state.find(t => t.id === payload.id);
        if (tobj) {
            return state.map(t => t.id === payload.id ? payload : t);
        } else {
            return [...state, payload];
        }
    };

    return (state: Array<T> = [], action: All<T>) => {
        if (action.collection === collection) {
            switch (action.type) {
                case PUT: {
                    return _putOne(state, action.payload);
                }
                case DEL: {
                    return state.filter(t => t.id !== action.id);
                }
                case INITIALIZE: {
                    return action.payload.reduce((state_, obj) => {
                        return _putOne(state_, obj);
                    }, state);
                }
                case CHOP: {
                    // Remove any objects that don't fall into a subscription
                    const chopFilter = action
                        .subscriptions
                        .map(s => Fx.toFilterExpr(s.filterDef))
                        .reduce((acc, filt) => t => acc(t) || filt(t), _ => false);
                    return state.filter(chopFilter);
                }
            }
        }
        return state;
    };
}

/**
    Use this reducer constructor when the `collection` is a single instance.
    The instance need not have an `id`. In fact, this is handy even when the
    singleton is an array, but that array always arrives in it's entirety.
*/
export function collectionReducerSingleton<T>(collection: string, initial: T) {
    return (state: T = initial, action: All<T>) => {
        if (action.collection === collection) {
            switch (action.type) {
                case PUT: {
                    return action.payload;
                }
                case DEL: {
                    return initial;
                }
            }
        }
        return state;
    };
}
