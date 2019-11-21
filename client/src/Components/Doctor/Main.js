import React, {Fragment, useState} from 'react';
import styled from 'styled-components';

import {Container} from '../Master/Container';
import {InfoSection} from '../Master/InfoSection';
import {Doctor, Visit} from '../../classes';
import {SaveChangesButton} from '../Master/SaveChangesButton';
import {Schedule, ScheduleBlock} from '../Master/Schedule';

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

    const changeActivity = (idVisit) => {
        const tempObj = new Doctor(doctorObj.idDoctor, doctorObj.imgUrl, doctorObj.name, doctorObj.age, doctorObj.specialization, doctorObj.experience, doctorObj.schedule);
        for(let i = 0; i < tempObj.schedule.length; i++) {
            if (tempObj.schedule[i].idVisit === idVisit) {
                const tempVisitObj = new Visit(tempObj.schedule[i].idVisit, tempObj.schedule[i].dayName, tempObj.schedule[i].timePeriod);
                tempVisitObj.active = tempObj.schedule[i].active;
                tempVisitObj.active ? tempVisitObj.setNotActive() : tempVisitObj.setActive();
                tempObj.schedule[i] = tempVisitObj;
                break;
            }
        }
        setDoctorObj(tempObj);
    }

    const SaveChanges = () => {
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
                        return <ScheduleBlock key={i} onClick={() => changeActivity(element.idVisit)} active={element.active} >{element.dayName}{element.timePeriod}</ScheduleBlock>
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
