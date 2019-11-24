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
                    return <Option key={i} onClick={() => {props.setSelectedSpecialization(element); props.setSelectedDoctor('')}}>{element}</Option>
                    })}
                </Blocks>
            </Container>
        </Section>
    )
}