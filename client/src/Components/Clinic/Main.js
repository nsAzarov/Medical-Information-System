import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {Container} from '../Master/Container';
import RoomsSection from './RoomsSection';
import {Clinic} from '../../classes';

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

const SaveChangesButton = styled.button`
    padding: 8px 14px;
    margin: 20px auto;
    border: 1px solid blue;
    border-radius: 3px;
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
            let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.clinicName);
            tempObj.doctorsList = clinicObj.doctorsList;
            tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;
            tempObj.addNewDoctorToList(doctorObj);
            setClinicObj(tempObj);
        }
    }

    const RemoveFromDoctorsList = (doctorObj) => {
        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.clinicName);
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;

        let tempDoctorsList = [];
        for(let i = 0; i < tempObj.doctorsList.length; i++) {
            if (tempObj.doctorsList[i].idDoctor !== doctorObj.idDoctor) {
                tempDoctorsList.push(tempObj.doctorsList[i]);
            }
        }
        tempObj.doctorsList = tempDoctorsList;

        setClinicObj(tempObj);
    }

    const SaveChanges = () => {
        let clinics = JSON.parse(localStorage.getItem('clinics'));
        let tempArr = [];

        for (let i = 0; i < clinics.length; i++) {
            if (clinics[i].idClinic !== clinicObj.idClinic) {
                tempArr.push(clinics[i]);
            } else {
                tempArr.push(clinicObj);
            }
        }
        
        clinics = tempArr;
        localStorage.setItem('clinics', JSON.stringify(tempArr));
    }

    return (
        <Container>
            <ClinicInfoSection>
                <Logo src={clinicObj.imgUrl ? clinicObj.imgUrl : 'https://izpk.ru/files/mark/nophoto600.jpg'}/>
                <Info>
                    <h1>{clinicObj.clinicName}</h1>
                    <h4>Количество врачей: {clinicObj.doctorsList.length}</h4>
                    <h4>Количество палат: {clinicObj.hospitalRoomsList.length}</h4>
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
                            <NewDoctor to='/AddDoctor'>Новый врач +</NewDoctor>
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
            <RoomsSection clinicState={[clinicObj, setClinicObj]} clinicObj={clinicObj}/>
            <hr />
            <SaveChangesButton onClick={() => SaveChanges()}>Сохранить изменения</SaveChangesButton>
        </Container>
    )
}
