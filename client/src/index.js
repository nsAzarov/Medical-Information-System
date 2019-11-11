import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import uniqid from 'uniqid';

import {Doctor} from './classes';

import './main.css'; 


localStorage.setItem('clinics', JSON.stringify([]));

const emptyDoctor = new Doctor(uniqid(), "", "", "", "", "");
localStorage.setItem('doctors', JSON.stringify([emptyDoctor]));

ReactDOM.render(<Router />, document.getElementById('root'));
