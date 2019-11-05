import React from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import { Container } from '../Master/Container'

const ChoiceTitle = styled.div``;

const ClinicOption = styled.div`
    display: inline-block;
    border: 1px solid black;
    border-radius: 8px;
    height: 100px;
    width: 200px;
`;

const AddNewClinic = styled(Link)`
    display: inline-block;
    border: 1px solid black;
    border-radius: 8px;
    height: 100px;
    width: 200px;
`;

export default function Main() {
    return (
        <Container>
            <ChoiceTitle>Выберите клинику</ChoiceTitle>
            <ClinicOption></ClinicOption>
            <AddNewClinic to="/AddClinic" />
        </Container>
    )
}
