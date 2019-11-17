import React from 'react';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';

export default function SpecializationSection(props) {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите специализацию врача</ChoiceTitle>
                {props.specializations.map((element, i) => {
                    return <h1 key={i} onClick={(element) => props.setSelectedSpecialization(element)}>{element}</h1>
                })}
            </Container>
        </Section>
    )
}