import React, {Fragment, useState} from 'react'
import styled from 'styled-components';

import ClinicsSection from './ClinicsSection';
import DoctorsSection from './DoctorsSection';
import SpecializationSection from './SpecializationSection';
import TimetableSection from './TimetableSection';
import LoginSection from './LoginSection';

export const ChoiceTitle = styled.h3`
    margin: 20px;
`;

export const Section = styled.section`
    width: 100%;
`;

export default function Main() {
    const [clinics] = useState(JSON.parse(localStorage.getItem('clinics')));
    const [selectedClinic, setSelectedClinic] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    
    return (
        <Fragment>
            <ClinicsSection clinics={clinics} selectedClinic={[selectedClinic, setSelectedClinic]} setSpecializations={setSpecializations} />
            {selectedClinic ?
                <>
                <SpecializationSection />
                {specializations.map((element, i) => {
                    return <h1 key={i} onClick={(element) => setSelectedSpecialization(element)}>{element}</h1>
                })}
                {selectedSpecialization ?
                    <>
                    <DoctorsSection />
                    <TimetableSection />
                    <LoginSection />
                    </>
                    :
                    null
                }
                </>
                :
                null
            }
        </Fragment>
    )
}
