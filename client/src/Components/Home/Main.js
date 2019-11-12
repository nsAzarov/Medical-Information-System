import React, {Fragment, useState} from 'react'
import styled from 'styled-components';

import ClinicsSection from './ClinicsSection';
import DoctorsSection from './DoctorsSection';
import SpecializationSection from './SpecializationSection';

export const ChoiceTitle = styled.h3`
    margin: 20px;
`;

export const Section = styled.section`
    width: 100%;
`;

export default function Main() {
    const [clinics] = useState(JSON.parse(localStorage.getItem('clinics')));
    const [selectedClinic, setSelectedClinic] = useState('');
    
    return (
        <Fragment>
            <ClinicsSection clinics={clinics} selectedClinic={[selectedClinic, setSelectedClinic]}/>
            <DoctorsSection />
            <SpecializationSection />
        </Fragment>
    )
}
