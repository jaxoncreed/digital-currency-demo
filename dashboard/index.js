import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore} from 'redux';
import reducer from './redux/reducer';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

const store = createStore(reducer);

const socket = io(`${location.protocol}//elenisocket.o.team`);

socket.on('state', state => {
	console.log("Getting state", state);
  store.dispatch({type: 'SET_STATE', state})
});

ReactDOM.render((
	  <Provider store={store}>
	  	<App />
	  </Provider>
  ),
  document.getElementById('app')
);