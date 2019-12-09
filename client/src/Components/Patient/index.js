import React, {Fragment} from 'react';

import Header from '../Master/Header';
import Main  from './Main';
import Footer from '../Master/Footer';

export default function Patient(props) {
    return (
        <Fragment>
            <Header />
            <Main SNILS={props.location.state.SNILS} />
            <Footer />
        </Fragment>
    )
}