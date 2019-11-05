import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';

import {Clinic} from '../../classes';
import Header from '../Master/Header';
import Main  from './Main';
import Footer from '../Master/Footer';

export default function Home() {
    const addNewClinic = () => {
        //localStorage.setItem('clinics', JSON.stringify([{"1": 1, "2": 2}, {"1": 1, "2": 2}, {"1": 1, "2": 2}]));
        let clinics = JSON.parse(localStorage.getItem('clinics'));
        //setModalOpened()
        //clinics.push({"1": 2, "2": 3});
        //localStorage.setItem('clinics', JSON.stringify(clinics));
        //arr.push('4');
        //console.log(arr);
        //arr.push(4);
        //localStorage.setItem('clinics', arr);
    }
    return (
        <Fragment>
            <Header />
            <Main />
            <Footer />
        </Fragment>
    )
}
