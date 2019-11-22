import React, {Fragment, useState} from 'react';
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
    console.log(doctorObj);
    const changeActivity = (idVisit) => {
        const tempObj = new Doctor(doctorObj.idDoctor, doctorObj.imgUrl, doctorObj.name, doctorObj.age, doctorObj.specialization, doctorObj.experience, doctorObj.schedule);
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
        console.log(doctorObj);
        let doctors = JSON.parse(localStorage.getItem('doctors'));
        let tempArr = [];

        for (let i = 0; i < doctors.length; i++) {
            if (doctors[i].idDoctor !== doctorObj.idDoctor) {
                tempArr.push(doctors[i]);
            } else {
                tempArr.push(doctorObj);
            }
        }
        
        doctors = tempArr;
        localStorage.setItem('doctors', JSON.stringify(tempArr));
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
                        {doctorObj.schedule.map((element, i) => {
                            return <DayBlock key={i}>
                                {element.visits.map((element, i) => {
                                return <ScheduleBlock key={i} onClick={() => changeActivity(element.idVisit)} active={element.active} >{element.dayName}{element.timePeriod}</ScheduleBlock>
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
