import React, {Fragment, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {Container} from '../Master/Container';
import {InfoSection} from '../Master/InfoSection';
import {Doctor, Visit} from '../../classes';
import {SaveChangesButton} from '../Master/SaveChangesButton';
import {Schedule, DayBlock, ScheduleBlock} from '../Master/Schedule';

const ScheduleSection = styled.section`
    width: 100%;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    h3 {
        margin-bottom: 20px;
    }
`;

const Photo = styled.img`
    max-height: 300px;
`;

export default function Main(props) {
    const [doctorObj, setDoctorObj] = useState(JSON.parse(props.doctorObj));
    console.log(doctorObj)
    const changeActivity = (idVisit) => {
        const tempObj = new Doctor(doctorObj.idDoctor, doctorObj.imgUrl, doctorObj.name, doctorObj.age, doctorObj.specialization, doctorObj.experience, doctorObj.schedule);
        tempObj._id = doctorObj._id;
        for(let i = 0; i < tempObj.schedule.length; i++) {
            for (let j = 0; j < tempObj.schedule[i].visits.length; j++) {
                if (tempObj.schedule[i].visits[j].idVisit === idVisit) {
                    const tempVisitObj = new Visit(tempObj.schedule[i].visits[j].idVisit, tempObj.schedule[i].visits[j].dayName, tempObj.schedule[i].visits[j].timePeriod);
                    tempVisitObj.active = tempObj.schedule[i].visits[j].active;
                    tempVisitObj.active ? tempVisitObj.setNotActive() : tempVisitObj.setActive();
                    tempObj.schedule[i].visits[j] = tempVisitObj;
                    break;
                }
            }
        }
        setDoctorObj(tempObj);
    }

    const SaveChanges = () => {
        axios
            .post("/SaveSchedule", {_id: doctorObj._id, schedule: doctorObj.schedule})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
    }

    return (
        <Fragment>
            <InfoSection>
                <Container>
                    <Photo src={doctorObj.imgUrl} alt='Photo' />
                    <Info>
                        <h3>{doctorObj.name}</h3>
                        <h4>Специализация: {doctorObj.specialization}</h4>
                        <h4>Возраст: {doctorObj.age}</h4>
                        <h4>Опыт: {doctorObj.experience}</h4>
                    </Info>
                </Container>
            </InfoSection>
            <hr />
            <ScheduleSection>
                <Container>
                    <Schedule>
                        <h3>Расписание врача</h3>
                        {doctorObj.schedule.map((day, i) => {
                            return <DayBlock key={i}>
                                {day.visits.map((visit, i) => {
                                return <ScheduleBlock key={i} onClick={() => changeActivity(visit.idVisit)} active={visit.active} >{visit.dayName}{visit.timePeriod}</ScheduleBlock>
                                })}
                            </DayBlock>
                        })}
                    </Schedule>
                </Container>
            </ScheduleSection>
            <hr />
            <Container>
                <SaveChangesButton onClick={() => SaveChanges()}>Сохранить изменения</SaveChangesButton>
            </Container>
        </Fragment>
    )
}
