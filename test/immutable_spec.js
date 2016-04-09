import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });

  });

  describe('A List', () => {

    function addAction(currentState, action) {
      return currentState.push(action);
    }

    it('is immutable', () => {
      let state = List.of('Joe -> John 3 Units', 'Bill -> Ted 7 Units');
      let nextState = addAction(state, 'Jim -> Sal 3 Units');

      expect(nextState).to.equal(List.of(
        'Joe -> John 3 Units',
        'Bill -> Ted 7 Units',
        'Jim -> Sal 3 Units'
      ));
      expect(state).to.equal(List.of(
        'Joe -> John 3 Units',
        'Bill -> Ted 7 Units'
      ));
    });

  });


  describe('a tree', () => {

    function addMember(currentState, member) {
      return currentState.update(
        'members',
        members => members.push(member)
      );
    }

    it('is immutable', () => {
      let state = Map({
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
      });
      let nextState = addMember(state, Map({
        name: "randall",
        number: "4045439927",
        amount: 0
      }));

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
          }),
          Map({
            name: "randall",
            number: "4045439927",
            amount: 0
          })
        )
      }));
      expect(state).to.equal(Map({
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


});