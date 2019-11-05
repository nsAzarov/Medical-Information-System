import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import {Clinic} from './classes';

import './main.css'; 

const emptyClinic = new Clinic("", [], 0);
localStorage.setItem('clinics', JSON.stringify([emptyClinic]));

ReactDOM.render(<Router />, document.getElementById('root'));
