import React from 'react';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';
import {Blocks, Option} from '../Master/Option';

export default function SpecializationSection(props) {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите специализацию врача</ChoiceTitle>
                <Blocks>
                    {props.specializations.map((element, i) => {
                    return <Option key={i} onClick={(element) => props.setSelectedSpecialization(element)}>{element}</Option>
                    })}
                </Blocks>
            </Container>
        </Section>
    )
}