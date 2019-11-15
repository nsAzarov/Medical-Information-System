import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {Container} from '../Master/Container';
import {Clinic} from '../../classes';

const ScheduleBlock = styled.div`
    height: 40px;
    width: 155px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    text-align: center;
`;

const Schedule = styled.div`
    h3 {
        width: 100%;
        text-align: center;
        margin-bottom: 30px;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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

const InfoSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SaveChangesButton = styled.button`
    padding: 8px 14px;
    margin: 20px auto;
    border: 1px solid blue;
    border-radius: 3px;
`;

export default function Main(props) {
    const [doctorObj, setDoctorObj] = useState(JSON.parse(props.doctorObj));
    const [doctorsInDB] = useState(JSON.parse(localStorage.getItem('doctors')));

    const SaveChanges = () => {
        let clinics = JSON.parse(localStorage.getItem('clinics'));
        let tempArr = [];

        for (let i = 0; i < clinics.length; i++) {
            if (clinics[i].idClinic !== doctorObj.idClinic) {
                tempArr.push(clinics[i]);
            } else {
                tempArr.push(doctorObj);
            }
        }
        
        clinics = tempArr;
        localStorage.setItem('clinics', JSON.stringify(tempArr));
    }

    return (
        <Fragment>
            <Container>
                <InfoSection>
                    <Photo src={doctorObj.imgUrl} alt='Photo' />
                    <Info>
                        <h3>{doctorObj.name}</h3>
                        <h4>Специализация: {doctorObj.specialization}</h4>
                        <h4>Возраст: {doctorObj.age}</h4>
                        <h4>Опыт: {doctorObj.experience}</h4>
                    </Info>
                </InfoSection>
                <hr />
            </Container>
            <ScheduleSection>
                <Container>
                    <Schedule>
                        <h3>Расписание врача</h3>
                        {doctorObj.schedule.map((element, i) => {
                        return <ScheduleBlock>{element.dayName}{element.timePeriod}</ScheduleBlock>
                        })}
                    </Schedule>
                </Container>
            </ScheduleSection>
            <Container>
                <hr />
                <SaveChangesButton onClick={() => SaveChanges()}>Сохранить изменения</SaveChangesButton>
            </Container>
        </Fragment>
    )
}
