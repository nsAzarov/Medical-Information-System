import React, {Fragment} from 'react';

import Header from '../Other/Header';
import Main  from './Main';

export default function Clinic(props) {
    return (
        <Fragment>
            <Header />
            <Main clinicObj={props.location.state.clinicObj} doctorsInDB={props.location.state.doctorsInDB}/>
        </Fragment>
    )
}
