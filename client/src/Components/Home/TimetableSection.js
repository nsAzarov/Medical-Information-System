import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Other/Container';
import {Schedule, DayBlock, ScheduleBlock} from '../Other/Schedule';

const TimetableSection = (props) => {
    const Scroll = () => {
        setTimeout(() => window.scrollTo(0,document.body.scrollHeight), 50)
    }
    return (
        <Section style={{paddingBottom: '30px'}} id='TimetableSection'>
            <Container>
                <ChoiceTitle>Выберите время приёма</ChoiceTitle>
                <Schedule>
                    {props.selectedDoctor.schedule.map((element, i) => {
                        return <DayBlock key={i}>
                            {element.visits.map((el, i) => {
                                if (el.active) {
                                    return <ScheduleBlock key={i} active={el.active} onClick={() => {props.selectVisitTime(el); Scroll()}}>{el.dayName}{el.timePeriod}</ScheduleBlock>    
                                } else {return null}
                            })}
                        </DayBlock>
                    })}
                </Schedule>
            </Container>
        </Section>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedClinic: state.selectedClinic,
        selectedSpecialization: state.selectedSpecialization,
        selectedDoctor: state.selectedDoctor,
        selectedVisitTime: state.selectedVisitTime
    }
}

export default connect(mapStateToProps, actionCreators)(TimetableSection);