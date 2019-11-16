import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {Container} from '../Master/Container';
import RoomsSection from './RoomsSection';
import {Clinic} from '../../classes';
import { useFormInput } from '../Master/functions';

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 120px;
    position: relative;
    svg {
        cursor: pointer;
        height: 25px;
        width: 25px;
        position: absolute;
        top: 0px;
        left: -44px;
        fill: blue;
    }
    form {
        display: flex;
        flex-direction: column;
        input {
            min-width: 250px;
            height: 22px;
            text-align: center;
        }
        button {
            margin-left: 5px;
            padding: 1px;
            border: 1px solid beige;
            border-radius: 5px;
            background: beige;
        }
    }
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
    border: 1px solid beige;
    border-radius: 3px;
    background: beige;
`;

export default function Main(props) {
    const [clinicObj, setClinicObj] = useState(JSON.parse(props.clinicObj));
    const [doctorsInDB] = useState(JSON.parse(localStorage.getItem('doctors')));
    const [editorOpened, setEditorOpened] = useState(false);
    const imgUrl = useFormInput(clinicObj.imgUrl);
    const clinicName = useFormInput(clinicObj.clinicName);

    const updateLogoImage = (e) => {
        e.preventDefault();

        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.clinicName);
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;
        tempObj.imgUrl = imgUrl.value;

        setEditorOpened(false);
        setClinicObj(tempObj);
    }

    const updateClinicName = (e) => {
        e.preventDefault();

        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.clinicName);
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;
        tempObj.clinicName = clinicName.value;

        setEditorOpened(false);
        setClinicObj(tempObj);
    }

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
                <Logo src={clinicObj.imgUrl ? clinicObj.imgUrl : 'https://izpk.ru/files/mark/nophoto600.jpg'} />
                <Info>
                    <svg onClick={() => setEditorOpened(!editorOpened)} height="401pt" viewBox="0 -1 401.52289 401" width="401pt" xmlns="http://www.w3.org/2000/svg"><path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/></svg>
                    <h1>{clinicObj.clinicName}</h1>
                    {editorOpened ? 
                    <form>
                        <span>
                            <input {...imgUrl} placeholder='Ссылка на картинку с логотипом'/>
                            <button onClick={(e) => updateLogoImage(e)}>Обновить</button>
                        </span>
                        <span>
                            <input {...clinicName} placeholder='Название клиники'/>
                            <button onClick={(e) => updateClinicName(e)}>Обновить</button>
                        </span>
                    </form>
                    :
                    null}
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
                            return <DoctorLine key={i} onClick={() => AddToDoctorsList(element)}>{element.specialization} - {element.name}</DoctorLine>
                            })}
                            <NewDoctor to='/AddDoctor'>Новый врач +</NewDoctor>
                        </DoctorsList>
                    </ChooseDoctors>
                    <ChooseDoctors>
                        <h4>Работающие в клинике</h4>
                        <DoctorsList>
                            {clinicObj.doctorsList.map((element, i) => {
                            return <DoctorLine key={i} onClick={() => RemoveFromDoctorsList(element)}>{element.specialization} - {element.name}</DoctorLine>
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
