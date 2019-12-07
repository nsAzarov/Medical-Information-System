import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {APIService} from '../Master/ApiService';
import {Container} from '../Master/Container';
import {InfoSection} from '../Master/InfoSection';
import {Doctor, Visit} from '../../classes';
import Examination from './Examination';
import {Button} from '../Master/Button';
import {Schedule, DayBlock, ScheduleBlock} from '../Master/Schedule';

const ExaminationSection = styled.section`
    width: 100%;
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
    margin-bottom: 10px;
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
    const [selectedAppointment, setSelectedAppointment] = useState('');

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
            <AppointmentsSection>
                <Container>
                    <Appointments>
                        <h3>Предстоящие записи</h3>
                        {appointmentsList.map((obj, i) => {
                        return <AppointmentBlock key={i} onClick={() => {setSelectedAppointment(obj)}}>
                            {obj.dayName}{obj.timePeriod}<br />
                            {obj.patientName}
                            </AppointmentBlock>
                        })}
                    </Appointments>
                </Container>
            </AppointmentsSection>
            <hr />
            {selectedAppointment ? 
            <>
                <ExaminationSection>
                    <Container>
                        <Examination selectedAppointment={selectedAppointment} />
                    </Container>
                </ExaminationSection>
                <hr />
            </>
            :null}
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
                    <Button onClick={() => SaveChanges()} style={{marginBottom: '50px'}}>Сохранить изменения</Button>
                </Container>
            </ScheduleSection>
        </Fragment>
    )
}
