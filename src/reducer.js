import {addMembers, addMoney, evenlyDivideMoney, transferMoney, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_MEMBERS':
    return addMembers(state, action.members);
  case 'ADD_MONEY':
    return addMoney(state, action.amount);
  case 'EVENLY_DIVIDE_MONEY':
    return evenlyDivideMoney(state);
  case 'TRANSFER_MONEY':
  	return transferMoney(state, action.from, action.to, action.amount);
  }
  return state;
}