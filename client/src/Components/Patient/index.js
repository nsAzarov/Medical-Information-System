import React, {Fragment} from 'react';

import Header from '../Other/Header';
import Main  from './Main';
import Footer from '../Other/Footer';

export default function Patient(props) {
    return (
        <Fragment>
            <Header />
            <Main SNILS={props.location.state.SNILS} />
            <Footer />
        </Fragment>
    )
}