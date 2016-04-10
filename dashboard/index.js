import React from 'react';
import ReactDOM from 'react-dom';
import { MemberListContainer } from './components/MemberList';
import {createStore} from 'redux';
import reducer from './redux/reducer';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Sunshine', '28 Days Later'],
      tally: {Sunshine: 2}
    }
  }
});

const socket = io(`${location.protocol}//${location.hostname}:8006`);

ReactDOM.render((
	  <Provider store={store}>
	  	<MemberListContainer />
	  </Provider>
  ),
  document.getElementById('app')
);