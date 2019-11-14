import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {Container} from '../Master/Container';
import {Clinic} from '../../classes';

const SaveChangesButton = styled.button`
    padding: 8px 14px;
    margin: 20px auto;
    border: 1px solid blue;
    border-radius: 3px;
`;

export default function Main(props) {
    const [doctorObj, setDoctorObj] = useState(JSON.parse(props.doctorObj));
    const [doctorsInDB] = useState(JSON.parse(localStorage.getItem('doctors')));

    const SaveChanges = () => {
        let clinics = JSON.parse(localStorage.getItem('clinics'));
        let tempArr = [];

        for (let i = 0; i < clinics.length; i++) {
            if (clinics[i].idClinic !== doctorObj.idClinic) {
                tempArr.push(clinics[i]);
            } else {
                tempArr.push(doctorObj);
            }
        }
        
        clinics = tempArr;
        localStorage.setItem('clinics', JSON.stringify(tempArr));
    }

    return (
        <Container>
            
            <hr />
            <SaveChangesButton onClick={() => SaveChanges()}>Сохранить изменения</SaveChangesButton>
        </Container>
    )
}
