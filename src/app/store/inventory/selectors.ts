import { RootState } from '../root.reducers';
import { State } from './reducers';
import { createSelector } from '@ngrx/store';

const selectInventory = (state: RootState) => state.inventory;

// TODO: I believe there is a combinator method for this already.
function _createSubselector<T>(selector: (state: State) => T) {
  return createSelector(selectInventory, selector);
}

export const selectCoils = _createSubselector(state => state.Coil);
export const selectCoilTypes = _createSubselector(state => state.CoilTypes);
export const selectConsumHistory = _createSubselector(state => state.ConsumptionHistory);


const _materialIdMatch = (id: string) => (m: { id }) => m.id === id;
const _materialCodeMatch = (code: string) => (m: { materialCode }) => m.materialCode === code;

export const selectDetailByMaterialCode = (code: string) => {
  return (state: RootState) => {
     return {
       coilType: selectCoilTypes(state).find(type => type.id === code),
       coils: selectCoils(state).filter((coil) => coil.materialCode === code),
       histories: selectConsumHistory(state).filter((history) => history.materialCode === code)
     };
  };
};

export const selectDetailByCoilId = (id: string) => {
  return (state: RootState) => {
     return {
       coil: selectCoils(state).find((coil) => coil.id === id),
       histories: selectConsumHistory(state).filter((history) => history.coilSerialNumber === id)
     };
  };
};
