import React, {Fragment, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import RoomsSection from './RoomsSection';
import {Container} from '../Master/Container';
import {InfoSection} from '../Master/InfoSection';
import {Clinic} from '../../classes';
import {ModalBackground, DeleteModal} from '../Master/Modal.js';
import {Button} from '../Master/Button';
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
    //const [doctorsInDB, setDoctorsInDB] = useState(JSON.parse(localStorage.getItem('doctors')));
    const [editorOpened, setEditorOpened] = useState(false);
    const [removableDoctor, setRemovableDoctor] = useState({});
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const imgUrl = useFormInput(clinicObj.imgUrl);
    const clinicName = useFormInput(clinicObj.name);
    
    /*const deleteDoctorFromDB = () => {
        let tempArr = [];
        for (let i = 0; i < doctorsInDB.length; i++) {
            if (doctorsInDB[i].idDoctor !== removableDoctor.idDoctor) {
                tempArr.push(doctorsInDB[i])
            }
        }
        setDoctorsInDB(tempArr);
        localStorage.setItem('doctors', JSON.stringify(tempArr));
    }*/

    const updateLogoImage = (e) => {
        e.preventDefault();

        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.name);
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;
        tempObj.imgUrl = imgUrl.value;

        setEditorOpened(false);
        setClinicObj(tempObj);
    }

    const updateClinicName = (e) => {
        e.preventDefault();

        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.name);
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;
        tempObj.name = clinicName.value;

        setEditorOpened(false);
        setClinicObj(tempObj);
    }

    const AddToDoctorsList = (idDoctor) => {
        let objectIsAlreadyInList = false;

        for (let i = 0; i < clinicObj.doctorsList.length; i++) {
            if(clinicObj.doctorsList[i] === idDoctor) objectIsAlreadyInList = true;
        }

        if (!objectIsAlreadyInList) {
            let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.name);
            tempObj._id = clinicObj._id;
            tempObj.doctorsList = clinicObj.doctorsList;
            tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;
            tempObj.doctorsList.push(idDoctor);
            //tempObj.addNewDoctorToList(doctorObj);
            setClinicObj(tempObj);

            axios
                .post("/AddToDoctorsList", {_id: clinicObj._id, idDoctor})
                .then(response => {console.log(response)})
                .catch(error => {console.log(error)})
        }
    }

    const RemoveFromDoctorsList = (idDoctor) => {
        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.name);
        tempObj._id = clinicObj._id;
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;

        let tempDoctorsList = [];
        for(let i = 0; i < tempObj.doctorsList.length; i++) {
            if (tempObj.doctorsList[i] !== idDoctor) {
                tempDoctorsList.push(tempObj.doctorsList[i]);
            }
        }
        tempObj.doctorsList = tempDoctorsList;
        
        setClinicObj(tempObj);
        
        axios
            .post("/RemoveFromDoctorsList", {_id: clinicObj._id, idDoctor})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
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
                    <button onClick={() => {//deleteDoctorFromDB(); 
                                            setDeleteModalOpened(false);}}>Да</button>
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
                        <h1>{clinicObj.name}</h1>
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
                                {props.doctorsInDB.map((element, i) => {
                                return <DoctorLine key={i} onClick={() => AddToDoctorsList(element.idDoctor)}>
                                    <div className='clickable-area'></div>
                                    {element.specialization} - {element.name}
                                    <Link to={{pathname: `/Doctor/${element.idDoctor}`, state: {doctorObj: JSON.stringify(element)}}}>
                                        <svg className='edit' height="511pt" viewBox="0 0 511.99896 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m140.671875 371.816406c-5.980469-5.980468-15.683594-5.980468-21.667969 0l-114.515625 114.519532c-5.984375 5.980468-5.984375 15.683593 0 21.667968 2.992188 2.992188 6.914063 4.488282 10.835938 4.488282 3.917969 0 7.839843-1.496094 10.832031-4.488282l114.515625-114.515625c5.988281-5.984375 5.988281-15.6875 0-21.671875zm0 0"/><path d="m507.511719 4.988281c-2.941407-2.941406-6.929688-4.53125-11.109375-4.488281l-191.074219 3.441406c-6.148437.113282-11.632813 3.886719-13.933594 9.585938-2.300781 5.699218-.972656 12.226562 3.375 16.570312l41.25 41.25-220.6875 220.6875c-2.871093 2.875-4.488281 6.773438-4.488281 10.835938s1.613281 7.960937 4.488281 10.835937l83.457031 83.449219c2.992188 2.992188 6.914063 4.488281 10.832032 4.488281 3.921875 0 7.84375-1.496093 10.835937-4.488281l220.683594-220.683594 41.253906 41.25c4.34375 4.347656 10.871094 5.675782 16.570313 3.375 5.699218-2.300781 9.472656-7.785156 9.582031-13.933594l3.449219-191.066406c.074218-4.15625-1.542969-8.167968-4.484375-11.109375zm0 0"/><path d="m20.898438 423.464844c3.921874 0 7.84375-1.5 10.832031-4.492188l67.214843-67.210937c5.984376-5.984375 5.984376-15.6875 0-21.671875-5.984374-5.980469-15.683593-5.980469-21.667968 0l-67.214844 67.214844c-5.984375 5.984374-5.984375 15.6875 0 21.671874 2.992188 2.988282 6.914062 4.488282 10.835938 4.488282zm0 0"/><path d="m160.734375 413.546875-67.21875 67.210937c-5.984375 5.984376-5.984375 15.6875 0 21.671876 2.992187 2.992187 6.914063 4.488281 10.835937 4.488281 3.921876 0 7.84375-1.496094 10.835938-4.488281l67.214844-67.214844c5.984375-5.984375 5.984375-15.6875 0-21.667969-5.984375-5.984375-15.6875-5.984375-21.667969 0zm0 0"/></svg>
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
                                {props.doctorsInDB.map((element, ind) => {
                                    for (let i = 0; i < props.doctorsInDB.length; i++) {
                                        if (clinicObj.doctorsList[i] === element.idDoctor) {
                                            return <DoctorLine key={ind}>
                                                <div className='clickable-area' onClick={() => RemoveFromDoctorsList(element.idDoctor)}></div>
                                                {element.specialization} - {element.name}
                                                <Link to={{pathname: `/Doctor/${element._id}`, state: {doctorObj: JSON.stringify(element)}}}>
                                                    <svg style={{right: 0}} className='edit' height="511pt" viewBox="0 0 511.99896 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m140.671875 371.816406c-5.980469-5.980468-15.683594-5.980468-21.667969 0l-114.515625 114.519532c-5.984375 5.980468-5.984375 15.683593 0 21.667968 2.992188 2.992188 6.914063 4.488282 10.835938 4.488282 3.917969 0 7.839843-1.496094 10.832031-4.488282l114.515625-114.515625c5.988281-5.984375 5.988281-15.6875 0-21.671875zm0 0"/><path d="m507.511719 4.988281c-2.941407-2.941406-6.929688-4.53125-11.109375-4.488281l-191.074219 3.441406c-6.148437.113282-11.632813 3.886719-13.933594 9.585938-2.300781 5.699218-.972656 12.226562 3.375 16.570312l41.25 41.25-220.6875 220.6875c-2.871093 2.875-4.488281 6.773438-4.488281 10.835938s1.613281 7.960937 4.488281 10.835937l83.457031 83.449219c2.992188 2.992188 6.914063 4.488281 10.832032 4.488281 3.921875 0 7.84375-1.496093 10.835937-4.488281l220.683594-220.683594 41.253906 41.25c4.34375 4.347656 10.871094 5.675782 16.570313 3.375 5.699218-2.300781 9.472656-7.785156 9.582031-13.933594l3.449219-191.066406c.074218-4.15625-1.542969-8.167968-4.484375-11.109375zm0 0"/><path d="m20.898438 423.464844c3.921874 0 7.84375-1.5 10.832031-4.492188l67.214843-67.210937c5.984376-5.984375 5.984376-15.6875 0-21.671875-5.984374-5.980469-15.683593-5.980469-21.667968 0l-67.214844 67.214844c-5.984375 5.984374-5.984375 15.6875 0 21.671874 2.992188 2.988282 6.914062 4.488282 10.835938 4.488282zm0 0"/><path d="m160.734375 413.546875-67.21875 67.210937c-5.984375 5.984376-5.984375 15.6875 0 21.671876 2.992187 2.992187 6.914063 4.488281 10.835937 4.488281 3.921876 0 7.84375-1.496094 10.835938-4.488281l67.214844-67.214844c5.984375-5.984375 5.984375-15.6875 0-21.667969-5.984375-5.984375-15.6875-5.984375-21.667969 0zm0 0"/></svg>
                                                </Link>
                                            </DoctorLine>
                                        } 
                                    }
                                    return null
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
                <Button onClick={() => SaveChanges()}>Сохранить изменения</Button>
            </Container>
        </Fragment>
    )
}
