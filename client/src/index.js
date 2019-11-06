import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import uniqid from 'uniqid';

import {Clinic, Doctor} from './classes';

import './main.css'; 

const emptyClinic = new Clinic(uniqid(), "", "");
localStorage.setItem('clinics', JSON.stringify([emptyClinic]));

const emptyDoctor = new Doctor(uniqid(), "", "", "", "", "");
localStorage.setItem('doctors', JSON.stringify([emptyDoctor]));

ReactDOM.render(<Router />, document.getElementById('root'));
