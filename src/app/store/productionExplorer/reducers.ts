import * as _ from 'lodash';

import {
  ADD_EXPLORER_DATA,
  SET_EXPLORER_AVAILABLE_DATE_RANGE,
  INIT_EXPLORER_DATA
} from './actions';

export interface State {
  explorerData: any[];
  range: {
    minDate: Date,
    maxDate: Date
  };
}

const initial: State = {
  explorerData: [],
  range: {
     // 30 days ago. This ugliness per https://stackoverflow.com/a/31665235/947
     minDate: new Date(new Date().setDate(new Date().getDate() - 30)),
     maxDate: new Date()
  }
};

function ExplorerDataReducer(data = initial, action) {
  switch (action.type) {
     case ADD_EXPLORER_DATA : {
        const by = selector => (e1, e2) => selector(e1) > selector(e2) ? -1 : 1;
        return {
           ...data,
           explorerData: data.explorerData.concat(action.payload).sort(by(x => x.date))
        };
     }
     case SET_EXPLORER_AVAILABLE_DATE_RANGE: {
        return {...data, range: action.payload};
     }
     case INIT_EXPLORER_DATA: {
      return {...data, explorerData: []};
     }
  }
  return data;
}


export const reducer = ExplorerDataReducer;
