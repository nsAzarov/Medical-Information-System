import React from 'react';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';
import {Schedule, DayBlock, ScheduleBlock} from '../Master/Schedule';

export default function TimetableSection(props) {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите время приёма</ChoiceTitle>
                <Schedule>
                    {props.doctorObj.schedule.map((element, i) => {
                        return <DayBlock key={i}>
                            {element.visits.map((el, i) => {
                                if (el.active) {
                                    return <ScheduleBlock key={i} active={el.active} >{el.dayName}{el.timePeriod}</ScheduleBlock>    
                                }
                            })}
                        </DayBlock>
                    })}
                </Schedule>
            </Container>
        </Section>
    )
}