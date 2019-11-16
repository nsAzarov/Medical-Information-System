import React from 'react';

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