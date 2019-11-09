import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import uniqid from 'uniqid';

import {Container} from '../Master/Container';
import {Clinic, HospitalRoom} from '../../classes';
import {useFormInput} from '../Master/functions';

const Logo = styled.img`
    height: 120px;
    width: 120px;
    margin: 20px;
`;

const ClinicInfoSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Info = styled.div`

`;

const DoctorsSection = styled.section`
    h3 {
        display: inline-block;
        margin: 20px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 40px;
`;

const ChoosingArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChooseDoctors = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
        display: inline-block;
    }
`;

const DoctorsList = styled.div`
    height: 200px;
    width: 400px;
    border: 1px solid grey;
    border-radius: 3px;
    margin: 0px 20px;
    overflow: auto;
`;

const NewDoctor = styled(Link)`

`;

const DoctorLine = styled.li`
    list-style-type: none;
`;

const RoomsSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
        margin: 25px;
    }
`;

const HospitalRooms = styled.div`
    width: 840px;
    display: flex;
    flex-wrap: wrap;
`;

const HospitalRoomBlock = styled.div`
    height: 90px;
    width: 190px;
    background: beige;
    margin: 0px 10px 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ul {
        list-style:none;
        li {

        }
    }
    &:last-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        h4 {
            margin-bottom: 10px;
            transition: .3s;
        }
        .plus-img {
            height: 40px;
            width: 40px;
            fill: #ff5e5e;
            transition: .3s;
        }
        &:hover {
            h4 {
                margin-bottom: 5px;
            }
            .plus-img {
                height: 45px;
                width: 45px;
                fill: red;
            }
        }
    }
`;

export default function Main(props) {
    const [clinicObj, setClinicObj] = useState(JSON.parse(props.clinicObj));
    const [doctorsInDB] = useState(JSON.parse(localStorage.getItem('doctors')));

    const AddToDoctorsList = (doctorObj) => {
        let objectIsAlreadyInList = false;

        for (let i = 0; i < clinicObj.doctorsList.length; i++) {
            if(clinicObj.doctorsList[i].idDoctor === doctorObj.idDoctor) objectIsAlreadyInList = true;
        }

        if (!objectIsAlreadyInList) {
            let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.clinicName, clinicObj.doctorsList, clinicObj.hospitalRoomsList);
            tempObj.addNewDoctorToList(doctorObj);
            setClinicObj(tempObj);
        }
    }

    const RemoveFromDoctorsList = (doctorObj) => {
        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.clinicName, clinicObj.doctorsList, clinicObj.hospitalRoomsList);

        let tempDoctorsList = [];
        for(let i = 0; i < tempObj.doctorsList.length; i++) {
            if (tempObj.doctorsList[i].idDoctor !== doctorObj.idDoctor) {
                tempDoctorsList.push(tempObj.doctorsList[i]);
            }
        }
        tempObj.doctorsList = tempDoctorsList;

        setClinicObj(tempObj);
    }

    const addNewHospitalRoomObject = () => {
        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.clinicName);
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;

        const newHospitalRoomObject = new HospitalRoom(uniqid(), '', 0, 0, []);
        tempObj.hospitalRoomsList.push(newHospitalRoomObject);

        setClinicObj(tempObj);
    }

    return (
        <Container>
            <ClinicInfoSection>
                <Logo src={clinicObj.imgUrl ? clinicObj.imgUrl : 'https://izpk.ru/files/mark/nophoto600.jpg'}/>
                <Info>
                    <h1>{clinicObj.clinicName}</h1>
                    <h4>Количество врачей: {clinicObj.doctorsList.length}</h4>
                    <h4>Количество палат: {clinicObj.roomsNumber}</h4>
                </Info>
            </ClinicInfoSection>
            <hr />
            <DoctorsSection>
                <h3>Добавьте врачей</h3>
                <ChoosingArea>
                    <ChooseDoctors>
                        <h4>Все врачи в базе данных</h4>
                        <DoctorsList>
                            {doctorsInDB.map((element, i) => {
                                return <DoctorLine key={i} onClick={() => AddToDoctorsList(element)}>{element.idDoctor}</DoctorLine>
                            })}
                            <NewDoctor to='/AddNewDoctor'>Новый врач +</NewDoctor>
                        </DoctorsList>
                    </ChooseDoctors>
                    <ChooseDoctors>
                        <h4>Работающие в клинике</h4>
                        <DoctorsList>
                            {clinicObj.doctorsList.map((element, i) => {
                                return <DoctorLine key={i} onClick={() => RemoveFromDoctorsList(element)}>{element.idDoctor}</DoctorLine>
                            })}
                        </DoctorsList>
                    </ChooseDoctors>
                </ChoosingArea>
            </DoctorsSection>
            <hr />
            <RoomsSection>
                <h3>Палаты в клинике</h3>
                <HospitalRooms>
                    {clinicObj.hospitalRoomsList.map((element, i) => {
                        return <HospitalRoomBlock key={i}>
                                <ul>
                                    <li>№{element.roomNumber || '-'}</li>
                                    <li>Вместимость: {element.capacity || '-'}</li>
                                    <li>Заполненность: {element.occupancy || '-'}</li>
                                </ul>
                            </HospitalRoomBlock>
                    })}
                    <HospitalRoomBlock onClick={() => addNewHospitalRoomObject()}>
                        <h4>Добавить палату</h4>
                        <svg xmlns="http://www.w3.org/2000/svg" className='plus-img' width="24" height="24" viewBox="0 0 24 24" ><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                    </HospitalRoomBlock>
                </HospitalRooms>
            </RoomsSection>
        </Container>
    )
}
