import React, {Fragment} from 'react';

import Header from '../Master/Header';
import Main  from './Main';
import Footer from '../Master/Footer';

export default function Clinic(props) {
    return (
        <Fragment>
            <Header />
            <Main clinicObj={props.location.state.clinicObj} doctorsInDB={props.location.state.doctorsInDB}/>
            <Footer />
        </Fragment>
    )
}
