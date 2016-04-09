import {fromJS, List} from 'immutable';
import {find} from 'lodash';

export const INITIAL_STATE = new Map();

export function addMembers(state, members) {
  return state.update('members', new List(), stateMembers => stateMembers.concat(fromJS(members)));
}

export function addMoney(state, amount) {
	return state.set('admin', amount);
}

export function evenlyDivideMoney(state) {
	var stateJS = state.toJS();
	var divider = Math.floor(stateJS.admin / stateJS.members.length);
	stateJS.members.forEach(member => {
		member.amount += divider;
		stateJS.admin -= divider;
	});
	return fromJS(stateJS);
}

export function transferMoney(state, from, to, amount) {
	var stateJS = state.toJS();
	var fromFound = false;
	var toFound = false;
	for (var i = 0; i < stateJS.members.length; i ++) {
		var member = stateJS.members[i];
		if (member.name === from) {
			fromFound = true;
			member.amount -= amount;
		} else if (member.name === to) {
			toFound = true;
			member.amount += amount;
		}
	}
	if (toFound && fromFound) {
		return fromJS(stateJS);
	} else {
		return state;
	}
}
