import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('is able to execute this sequence properly', () => {
    const actions = [
      {type: 'ADD_MEMBERS', members: [
        {
          name: "jackson",
          number: "6786999704",
          amount: 0
        },
        {
          name: "cathy",
          number: "4043139559",
          amount: 0
        }
      ]},
      {type: 'ADD_MEMBERS', members: [
        {
          name: "randall",
          number: "4045439927",
          amount: 0
        }
      ]},
      {type: 'ADD_MONEY', amount: 67},
      {type: 'EVENLY_DIVIDE_MONEY'},
      {type: 'TRANSFER_MONEY', from: 'jackson', to:'cathy', amount:12},
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      members: [
        {
          name: "jackson",
          number: "6786999704",
          amount: 10
        },
        {
          name: "cathy",
          number: "4043139559",
          amount: 34
        },
        {
          name: "randall",
          number: "4045439927",
          amount: 22
        }
      ],
      admin: 1
    }));
  });
});
