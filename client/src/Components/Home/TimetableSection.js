import React from 'react';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';
import {Schedule, ScheduleBlock} from '../Master/Schedule';

export default function TimetableSection(props) {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите время приёма</ChoiceTitle>
                <Schedule>
                    {props.doctorObj.schedule.map((element, i) => {
                    return <ScheduleBlock key={i} active={element.active}>{element.dayName}{element.timePeriod}</ScheduleBlock>
                    })}
                </Schedule>
            </Container>
        </Section>
    )
}