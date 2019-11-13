import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';
import {AddNewBlock} from '../Master/AddNewBlock';

const AddNewClinic = styled(Link)`
    height: 100%;
    width: 100%;
    position: absolute;
    border: 1px solid black;
    border-radius: 8px;
`;

const ClinicOption = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 8px;
    height: 100px;
    width: 200px;
    margin: 0 10px 10px 10px;
    img {
        height: 100px;
    }
`;

const ClinicsBlocks = styled.div`
    display: flex;

`;

export default function ClinicsSection(props) {
    const [selectedClinic, setSelectedClinic] = props.selectedClinic;

    const setSpecializationsArr = (clinic) => {
        console.log(clinic)
        let arr = [];
        for(let i = 0; i < clinic.doctorsList.length; i++) {
            if (arr.indexOf(clinic.doctorsList[i].specialization) == -1) {
                arr.push(clinic.doctorsList[i].specialization);
            }
        }
        props.setSpecializations(arr);
    }

    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите клинику</ChoiceTitle>
                <ClinicsBlocks>
                    {props.clinics.map((element, i) => {
                        return <ClinicOption key={i} onClick={() => {setSpecializationsArr(props.clinics[i]); setSelectedClinic(props.clinics[i])}}>
                            <img src={element.imgUrl} alt="" />
                        </ClinicOption>
                    })}
                    <AddNewBlock>
                        <AddNewClinic to="/AddClinic" />
                        <h4>Добавить клинику</h4>
                        <svg xmlns="http://www.w3.org/2000/svg" className='plus-img' width="24" height="24" viewBox="0 0 24 24" ><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                    </AddNewBlock>
                </ClinicsBlocks>
            </Container>
        </Section>
    )
}
