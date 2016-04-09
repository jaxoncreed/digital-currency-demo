import {List, Map} from 'immutable';
import {expect} from 'chai';

import {addMembers, addMoney, evenlyDivideMoney, transferMoney} from '../src/core';

describe('application logic', () => {


  // ADD MEMBERS ---------------------------------------------------------------
  describe('addMembers', () => {

    it('adds the members to the state', () => {
      const state = Map();
      const users = List.of(
        Map({
          name: "jackson",
          number: "6786999704",
          amount: 50
        }),
        Map({
          name: "cathy",
          number: "4043139559",
          amount: 23
        })
      );
      const nextState = addMembers(state, users);
      expect(nextState).to.equal(Map({
        members: List.of(
          Map({
            name: "jackson",
            number: "6786999704",
            amount: 50
          }),
          Map({
            name: "cathy",
            number: "4043139559",
            amount: 23
          })
        )
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const users = [
        {
          name: "jackson",
          number: "6786999704",
          amount: 50
        },
        {
          name: "cathy",
          number: "4043139559",
          amount: 23
        }
      ];
      const nextState = addMembers(state, users);
      expect(nextState).to.equal(Map({
        members: List.of(
          Map({
            name: "jackson",
            number: "6786999704",
            amount: 50
          }),
          Map({
            name: "cathy",
            number: "4043139559",
            amount: 23
          })
        )
      }));
    });

  });

  // addMoney ------------------------------------------------------------------
  describe('addMoney', ()=> {
    it('Adds money to admin', () => {
      const state = Map();
      const nextState = addMoney(state, 50);
      expect(nextState).to.equal(Map({
        admin: 50
      }));
    });
  });

  // evenlyDivideMoney ---------------------------------------------------------
  describe('evenlyDivideMoney', ()=> {
    it('should update the state with evenly divided money', ()=> {
      const state = Map({
        members: List.of(
          Map({
            name: "jackson",
            number: "6786999704",
            amount: 0
          }),
          Map({
            name: "cathy",
            number: "4043139559",
            amount: 0
          })
        ),
        admin: 51
      })
      const nextState = evenlyDivideMoney(state)
      expect(nextState).to.equal(Map({
        members: List.of(
          Map({
            name: "jackson",
            number: "6786999704",
            amount: 25
          }),
          Map({
            name: "cathy",
            number: "4043139559",
            amount: 25
          })
        ),
        admin: 1
      }));
    });
  });

  // transferMoney -------------------------------------------------------------

  describe('transferMoney', ()=> {

    it('should update the state when money transferred', ()=> {
      const state = Map({
        members: List.of(
          Map({
            name: "jackson",
            number: "6786999704",
            amount: 25
          }),
          Map({
            name: "cathy",
            number: "4043139559",
            amount: 25
          })
        ),
        admin: 1
      })
      const nextState = transferMoney(state, 'jackson', 'cathy', 20);
      expect(nextState).to.equal(Map({
        members: List.of(
          Map({
            name: "jackson",
            number: "6786999704",
            amount: 5
          }),
          Map({
            name: "cathy",
            number: "4043139559",
            amount: 45
          })
        ),
        admin: 1
      }));
    });
  });
});
