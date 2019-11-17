import React, {Fragment} from 'react';

import Header from '../Master/Header';
import Main  from './Main';
import Footer from '../Master/Footer';

export default function Doctor(props) {
    return (
        <Fragment>
            <Header />
            <Main doctorObj={props.location.state.doctorObj}/>
            <Footer />
        </Fragment>
    )
}