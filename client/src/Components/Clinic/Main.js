import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import RoomsSection from './RoomsSection';
import {Container} from '../Master/Container';
import {InfoSection} from '../Master/InfoSection';
import {Clinic} from '../../classes';
import {ModalBackground, DeleteModal} from '../Master/Modal.js';
import {SaveChangesButton} from '../Master/SaveChangesButton';
import {useFormInput} from '../Master/functions';

const Logo = styled.img`
    height: 120px;
    width: 120px;
    margin: 20px;
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
        fill: #4552e6;
        &:hover {
            fill: blue;
        }
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
    ${Container} {
        padding-bottom: 0;
    }
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
    .clickable-area {
        cursor: pointer;
        position: absolute;
        height: 100%;
        width: 380px;
        left: 0;
    }
    list-style-type: none;
    transition: .2s;
    width: 100%;
    position: relative;
    .edit {
        cursor: pointer;
        position: absolute;
        right: 20px;
        height: 18px;
        width: 18px;
        fill: #4552e6;
        &:hover {
            fill: blue;
        }
    }
    .delete {
        cursor: pointer;
        position: absolute;
        right: 0;
        height: 18px;
        width: 18px;
        fill: #ff5e5e;
        &:hover {
            fill: red;
        }
    }
    &:hover {
        background: whitesmoke;
    }
`;

export default function Main(props) {
    const [clinicObj, setClinicObj] = useState(JSON.parse(props.clinicObj));
    const [doctorsInDB, setDoctorsInDB] = useState(JSON.parse(localStorage.getItem('doctors')));
    const [editorOpened, setEditorOpened] = useState(false);
    const [removableDoctor, setRemovableDoctor] = useState({});
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const imgUrl = useFormInput(clinicObj.imgUrl);
    const clinicName = useFormInput(clinicObj.clinicName);

    const deleteDoctorFromDB = () => {
        let tempArr = [];
        for (let i = 0; i < doctorsInDB.length; i++) {
            if (doctorsInDB[i].idDoctor !== removableDoctor.idDoctor) {
                tempArr.push(doctorsInDB[i])
            }
        }
        setDoctorsInDB(tempArr);
        localStorage.setItem('doctors', JSON.stringify(tempArr));
    }

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
        <Fragment>
            {deleteModalOpened ?
            <>
            <ModalBackground />
            <DeleteModal>
                <svg onClick={() => setDeleteModalOpened(false)} height="511.992pt" viewBox="0 0 511.992 511.992" width="511.992pt" xmlns="http://www.w3.org/2000/svg"><path d="m415.402344 495.421875-159.40625-159.410156-159.40625 159.410156c-22.097656 22.09375-57.921875 22.09375-80.019532 0-22.09375-22.097656-22.09375-57.921875 0-80.019531l159.410157-159.40625-159.410157-159.40625c-22.09375-22.097656-22.09375-57.921875 0-80.019532 22.097657-22.09375 57.921876-22.09375 80.019532 0l159.40625 159.410157 159.40625-159.410157c22.097656-22.09375 57.921875-22.09375 80.019531 0 22.09375 22.097657 22.09375 57.921876 0 80.019532l-159.410156 159.40625 159.410156 159.40625c22.09375 22.097656 22.09375 57.921875 0 80.019531-22.097656 22.09375-57.921875 22.09375-80.019531 0zm0 0" fill="#e76e54"/></svg>
                <h4>Вы действительно хотите удалить этого врача из Базы Данных?</h4>
                <img src={removableDoctor.imgUrl} alt=""/>
                <h5>{removableDoctor.name}</h5>
                <h5>{removableDoctor.specialization}</h5>
                <span>
                    <h5>Возраст: {removableDoctor.age}</h5>
                    <h5>Стаж: {removableDoctor.experience}</h5>
                </span>
                <div id='btn-area'>
                    <button onClick={() => {deleteDoctorFromDB(); setDeleteModalOpened(false);}}>Да</button>
                    <button onClick={() => setDeleteModalOpened(false)} >Нет</button>
                </div>
            </DeleteModal>
            </>
            :
            null}
            <InfoSection>
                <Container>
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
                </Container>
            </InfoSection>
            <hr />            
            <DoctorsSection>
                <Container>
                    <h3>Добавьте врачей</h3>
                    <ChoosingArea>
                        <ChooseDoctors>
                            <h4>Все врачи в базе данных</h4>
                            <DoctorsList>
                                {doctorsInDB.map((element, i) => {
                                return <DoctorLine key={i} onClick={() => AddToDoctorsList(element)}>
                                    <div className='clickable-area'></div>
                                    {element.specialization} - {element.name}
                                    <Link to={{pathname: `/Doctor/${element.idDoctor}`, state: {doctorObj: JSON.stringify(element)}}}>
                                        <svg className='edit' height="401pt" viewBox="0 -1 401.52289 401" width="401pt" xmlns="http://www.w3.org/2000/svg"><path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/></svg>
                                    </Link>
                                    <svg onClick={() => {setRemovableDoctor(element); setDeleteModalOpened(true)}} className='delete' height="427pt" viewBox="-40 0 427 427.00131" width="427pt" xmlns="http://www.w3.org/2000/svg"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/></svg>
                                    </DoctorLine>
                                })}
                                <NewDoctor to='/AddDoctor'>Новый врач +</NewDoctor>
                            </DoctorsList>
                        </ChooseDoctors>
                        <ChooseDoctors>
                            <h4>Работающие в клинике</h4>
                            <DoctorsList>
                                {clinicObj.doctorsList.map((element, i) => {
                                return <DoctorLine key={i} onClick={() => RemoveFromDoctorsList(element)}>
                                    <div className='clickable-area'></div>
                                    {element.specialization} - {element.name}
                                    <Link to={{pathname: `/Doctor/${element.idDoctor}`, state: {doctorObj: JSON.stringify(element)}}}>
                                        <svg  style={{right: 0}} className='edit' height="401pt" viewBox="0 -1 401.52289 401" width="401pt" xmlns="http://www.w3.org/2000/svg"><path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/></svg>
                                    </Link>
                                    </DoctorLine>
                                })}
                            </DoctorsList>
                        </ChooseDoctors>
                    </ChoosingArea>
                </Container>
            </DoctorsSection>
            <hr />
            <RoomsSection clinicState={[clinicObj, setClinicObj]} clinicObj={clinicObj}/>
            <hr />
            <Container>
                <SaveChangesButton onClick={() => SaveChanges()}>Сохранить изменения</SaveChangesButton>
            </Container>
        </Fragment>
    )
}
