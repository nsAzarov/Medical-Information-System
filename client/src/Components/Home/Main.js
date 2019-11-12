import React, {Fragment, useState} from 'react'

import ClinicsSection from './ClinicsSection';

export default function Main() {
    const [clinics] = useState(JSON.parse(localStorage.getItem('clinics')));
    const [selectedClinic, setSelectedClinic] = useState('');
    
    return (
        <Fragment>
            <ClinicsSection clinics={clinics} selectedClinic={[selectedClinic, setSelectedClinic]}/>
            
        </Fragment>
    )
}
