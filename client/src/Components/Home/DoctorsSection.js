import React from 'react';

import {ChoiceTitle, Section} from './Main';
import {Blocks, Option} from '../Master/Option';
import {Container} from '../Master/Container';

export default function DoctorsSection(props) {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите врача</ChoiceTitle>
                <Blocks>
                    {props.doctors.map((element, i) => {
                        if (element.specialization === props.selectedSpecialization) {
                            return <Option key={i} onClick={() => props.setSelectedDoctor(element)}>
                                <img src={element.imgUrl} alt="" />
                                {element.name}
                            </Option>
                        }
                    })}
                </Blocks>
            </Container>
        </Section>
    )
}
