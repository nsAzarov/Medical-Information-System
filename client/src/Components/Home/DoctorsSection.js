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
                    {props.doctorsID.map((element, i) => {
                        for (let j = 0; j < props.doctorsInDB.length; j++) {
                            if ((props.doctorsInDB[j].idDoctor === element) && (props.doctorsInDB[j].specialization === props.selectedSpecialization)) {
                                return <Option key={i} onClick={() => props.setSelectedDoctor(props.doctorsInDB[j])}>
                                    <img src={props.doctorsInDB[j].imgUrl} alt="" />
                                    {props.doctorsInDB[j].name}
                                </Option>
                            }
                        }
                    })}
                </Blocks>
            </Container>
        </Section>
    )
}
