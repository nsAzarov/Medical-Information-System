import React from 'react';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';

export default function DoctorsSection() {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите врача</ChoiceTitle>
            </Container>
        </Section>
    )
}
