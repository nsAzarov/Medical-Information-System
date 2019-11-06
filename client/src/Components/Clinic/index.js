import React, {Fragment} from 'react';

import Header from '../Master/Header';
import Main  from './Main';
import Footer from '../Master/Footer';

export default function AddNewClinic(props) {
    return (
        <Fragment>
            <Header />
            <Main idClinic={props.match.params.id}/>
            <Footer />
        </Fragment>
    )
}
