import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

import './main.css'; 

const store = createStore(rootReducer);
store.subscribe(() => console.log('store ', store.getState()))

ReactDOM.render(
    <Provider store={store}><Router /></Provider>,
    document.getElementById('root')
);
