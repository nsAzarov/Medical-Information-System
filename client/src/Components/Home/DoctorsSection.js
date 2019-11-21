import React from 'react';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';

export default function DoctorsSection(props) {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите врача</ChoiceTitle>
                {props.doctors.map((element, i) => {
                    //console.log(props.selectedSpecialization)
                    //console.log(element)
                    if (element.specialization === props.selectedSpecialization) {
                        return <h1 key={i}>{element.name}</h1>
                    }
                })}
            </Container>
        </Section>
    )
}
