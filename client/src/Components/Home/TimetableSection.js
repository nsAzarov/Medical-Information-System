import React from 'react';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';
import {Schedule, DayBlock, ScheduleBlock} from '../Master/Schedule';

export default function TimetableSection(props) {
    const Scroll = () => {
        setTimeout(() => window.scrollTo(0,document.body.scrollHeight), 50)
    }
    return (
        <Section style={{paddingBottom: '30px'}} id='TimetableSection'>
            <Container>
                <ChoiceTitle>Выберите время приёма</ChoiceTitle>
                <Schedule>
                    {props.doctorObj.schedule.map((element, i) => {
                        return <DayBlock key={i}>
                            {element.visits.map((el, i) => {
                                if (el.active) {
                                    return <ScheduleBlock key={i} active={el.active} onClick={() => {props.setSelectedVisitTime(el); Scroll()}}>{el.dayName}{el.timePeriod}</ScheduleBlock>    
                                } else {return null}
                            })}
                        </DayBlock>
                    })}
                </Schedule>
            </Container>
        </Section>
    )
}