import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {APIService} from '../Master/ApiService';
import {Container} from '../Master/Container';
import {InfoSection} from '../Master/InfoSection';
import {ModalBackground} from '../Master/Modal';
import {Doctor, Visit} from '../../classes';
import {SaveChangesButton} from '../Master/SaveChangesButton';
import {Schedule, DayBlock, ScheduleBlock} from '../Master/Schedule';

const AppointmentModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
    height: 600px;
    width: 480px;
    background: white;
    position: absolute;
    left: 50%;
    margin-left: -260px;
    bottom: 0;
    margin-bottom: -450px;
    z-index: 100;
    svg {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        height: 25px;
        width: 25px;
        margin: 5px;
    }
    #top-area {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        img:first-child {
            height: 150px;
        }
        img {
            height: 220px;
        }
    }
    #patient-info {
        padding: 10px 0;
        text-align: center;
    }
    #appointment-time {
        padding: 10px 0;
        text-align: center;
        font-size: 20px;
    }
    #btn-area {
        display: flex;
        margin-top: 5px;
        button {
            width: 60px;
            background: beige;
            border-radius: 3px;
            &:last-child {
                margin-left: 10px;
            }
        }
    }
`;

const AppointmentBlock = styled.div`
    height: 100px;
    width: 198px;
    background: beige;
    border-radius: 8px;
    margin: 0px 10px 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    cursor: pointer;
`;

const Appointments = styled.div`
    h3 {
        width: 100%;
        text-align: center;
        margin: 20px;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;
`;

const AppointmentsSection = styled.section`
    width: 100%;
`;

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
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [appointmentModalOpened, setAppointmentModalOpened] = useState(false);
    const [windowHeight, setWindowHeight] = useState(document.body.offsetHeight);

    useEffect(() => {
        setWindowHeight(document.body.offsetHeight);
    }, [appointmentModalOpened])

    useEffect(() => {
        const ApiService = new APIService();
        ApiService
            .getAppointmentsList(doctorObj._id)
            .then(appointments => {
                setAppointmentsList(appointments);
                //setLoading(false);
            });
    }, [doctorObj])

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
                    <SaveChangesButton onClick={() => SaveChanges()}>Сохранить изменения</SaveChangesButton>
                </Container>
            </ScheduleSection>
            <hr />
            <AppointmentsSection>
                <Container>
                    <Appointments>
                        <h3>Предстоящие записи</h3>
                        {appointmentsList.map((el, i) => {
                        return <AppointmentBlock key={i} onClick={() => setAppointmentModalOpened(true)}>
                            {el.dayName}{el.timePeriod}<br />
                            {el.patientName}
                            </AppointmentBlock>
                        })}
                    </Appointments>
                </Container>
            </AppointmentsSection>
            {appointmentModalOpened ? 
            <>
                <ModalBackground height={windowHeight}/>
                <AppointmentModal></AppointmentModal>
            </>
            :null}
        </Fragment>
    )
}
