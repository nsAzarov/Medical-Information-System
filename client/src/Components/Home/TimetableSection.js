import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';

export default function TimetableSection() {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите время приёма</ChoiceTitle>
            </Container>
        </Section>
    )
}