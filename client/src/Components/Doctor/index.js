import React, {Fragment} from 'react';

import Header from '../Other/Header';
import Main  from './Main';
import Footer from '../Other/Footer';

export default function Doctor(props) {
    return (
        <Fragment>
            <Header />
            <Main doctorObj={props.location.state.doctorObj}/>
            <Footer />
        </Fragment>
    )
}