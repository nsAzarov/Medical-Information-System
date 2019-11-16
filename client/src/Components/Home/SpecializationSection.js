import React from 'react';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';

export default function SpecializationSection() {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите специализацию врача</ChoiceTitle>
            </Container>
        </Section>
    )
}