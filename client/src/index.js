import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import uniqid from 'uniqid';

import {Doctor} from './classes';

import './main.css'; 

if (!localStorage.getItem('clinics')) {
    localStorage.setItem('clinics', JSON.stringify([]));
}

if(!localStorage.getItem('doctors')) {
    const emptyDoctor = new Doctor(uniqid(), "img", "name", "age", "spec", "exp", "schedule");
    localStorage.setItem('doctors', JSON.stringify([emptyDoctor]));
}

ReactDOM.render(<Router />, document.getElementById('root'));
