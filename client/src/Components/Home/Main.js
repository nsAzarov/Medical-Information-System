import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

import ClinicsSection from './ClinicsSection';
import DoctorsSection from './DoctorsSection';
import SpecializationSection from './SpecializationSection';
import TimetableSection from './TimetableSection';
import AppointmentSection from './AppointmentSection';

import {Container} from '../Other/Container';
import {ModalBackground, DeleteModal} from '../Other/Modal';
import {useFormInput} from '../Other/functions';
import {APIService, Appointment} from '../../classes';

export const ChoiceTitle = styled.h3`
    margin: 20px;
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    ${Container} {
        padding-bottom: 0;
    }
`;

const ConfirmModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
    height: 370px;
    width: 480px;
    background: white;
    position: absolute;
    left: 50%;
    margin-left: -260px;
    top: 50%;
    margin-top: -190px;
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

const Main = (props) => {
    const [clinics, setClinics] = useState([]);
    const [doctorsInDB, setDoctorsInDB] = useState([]);
    const [clinicsLoading, setClinicsLoading] = useState(true);
    const [doctorsLoading, setDoctorsLoading] = useState(true);

    useEffect(() => {
        const ApiService = new APIService();
        ApiService
            .getAllClinics()
            .then(clinics => {
                setClinics(clinics);
                setClinicsLoading(false);
            });
    }, []);

    useEffect(() => {
        const ApiService = new APIService();
        ApiService
            .getAllDoctors()
            .then(doctors => {
                setDoctorsInDB(doctors);
                setDoctorsLoading(false);
            });
    }, []);

    const [selectedClinic, setSelectedClinic] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedVisitTime, setSelectedVisitTime] = useState('');
    const SNILS = useFormInput('');
    const LnameFname = useFormInput('');

    const [removableClinic, setRemovableClinic] = useState({});
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [confirmModalOpened, setConfirmModalOpened] = useState(false);

    const [windowHeight, setWindowHeight] = useState(document.body.offsetHeight);

    useEffect(() => {
        setWindowHeight(Math.max(window.screen.height, document.body.offsetHeight));
    }, [deleteModalOpened, confirmModalOpened])

    //ПЕРЕДЕЛАТЬ
    const deleteClinicFromDB = () => {
        let tempArr = [];
        for (let i = 0; i < clinics.length; i++) {
            if (clinics[i].idClinic !== removableClinic.idClinic) {
                tempArr.push(clinics[i])
            }
        }
        setClinics(tempArr);
        localStorage.setItem('clinics', JSON.stringify(tempArr));
    }
    
    const makeAppointmentWithDoctor = () => {
        let appointment = new Appointment(selectedClinic._id, selectedDoctor._id, selectedVisitTime.dayName, selectedVisitTime.timePeriod, SNILS.value, LnameFname.value);
        
        axios
            .post("/MakeAppointment", {...appointment})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
    }

    return (
        <Fragment>
            {deleteModalOpened ?
            <>
            <ModalBackground height={windowHeight}/>
            <DeleteModal>
                <svg onClick={() => setDeleteModalOpened(false)} height="511.992pt" viewBox="0 0 511.992 511.992" width="511.992pt" xmlns="http://www.w3.org/2000/svg"><path d="m415.402344 495.421875-159.40625-159.410156-159.40625 159.410156c-22.097656 22.09375-57.921875 22.09375-80.019532 0-22.09375-22.097656-22.09375-57.921875 0-80.019531l159.410157-159.40625-159.410157-159.40625c-22.09375-22.097656-22.09375-57.921875 0-80.019532 22.097657-22.09375 57.921876-22.09375 80.019532 0l159.40625 159.410157 159.40625-159.410157c22.097656-22.09375 57.921875-22.09375 80.019531 0 22.09375 22.097657 22.09375 57.921876 0 80.019532l-159.410156 159.40625 159.410156 159.40625c22.09375 22.097656 22.09375 57.921875 0 80.019531-22.097656 22.09375-57.921875 22.09375-80.019531 0zm0 0" fill="#e76e54"/></svg>
                <h4>Вы действительно хотите удалить эту клинику из Базы Данных?</h4>
                <img src={removableClinic.imgUrl} alt='logo-img' />
                <div id='btn-area'>
                    <button onClick={() => {deleteClinicFromDB(); setDeleteModalOpened(false)}}>Да</button>
                    <button onClick={() => setDeleteModalOpened(false)}>Нет</button>
                </div>
            </DeleteModal>
            </>
            :
            null}
            {confirmModalOpened ?
            <>
            <ModalBackground height={windowHeight} onClick={() => setConfirmModalOpened(false)}/>
            <ConfirmModal>
                <svg onClick={() => setConfirmModalOpened(false)} height="511.992pt" viewBox="0 0 511.992 511.992" width="511.992pt" xmlns="http://www.w3.org/2000/svg"><path d="m415.402344 495.421875-159.40625-159.410156-159.40625 159.410156c-22.097656 22.09375-57.921875 22.09375-80.019532 0-22.09375-22.097656-22.09375-57.921875 0-80.019531l159.410157-159.40625-159.410157-159.40625c-22.09375-22.097656-22.09375-57.921875 0-80.019532 22.097657-22.09375 57.921876-22.09375 80.019532 0l159.40625 159.410157 159.40625-159.410157c22.097656-22.09375 57.921875-22.09375 80.019531 0 22.09375 22.097657 22.09375 57.921876 0 80.019532l-159.410156 159.40625 159.410156 159.40625c22.09375 22.097656 22.09375 57.921875 0 80.019531-22.097656 22.09375-57.921875 22.09375-80.019531 0zm0 0" fill="#e76e54"/></svg>
                <div>
                    <div id="top-area">
                        <img src={selectedClinic.imgUrl} alt=""/>
                        <img src={selectedDoctor.imgUrl} alt=""/>
                        <div id="doctor-info">
                            {selectedDoctor.name}<br />
                            {selectedDoctor.specialization}<br />
                            Стаж: {selectedDoctor.experience}<br />
                        </div>
                    </div>
                    <div id="appointment-time">
                        {selectedVisitTime.dayName} {selectedVisitTime.timePeriod}
                    </div>
                    <div id="patient-info">
                        СНИЛС: {SNILS.value}<br />
                        Ваше Имя: {LnameFname.value}<br />
                    </div>
                </div>
                <h3>Всё верно?</h3>
                <div id='btn-area'>
                    <button onClick={() => {makeAppointmentWithDoctor(); setConfirmModalOpened(false)}}>Да</button>
                    <button onClick={() => setConfirmModalOpened(false)}>Нет</button>
                </div>
            </ConfirmModal>
            </>
            :null}
            <ClinicsSection clinics={clinics} clinicsLoading={clinicsLoading} doctorsInDB={doctorsInDB} doctorsLoading={doctorsLoading} setSelectedClinic={setSelectedClinic} setSpecializations={setSpecializations} setRemovableClinic={setRemovableClinic} setDeleteModalOpened={setDeleteModalOpened} setSelectedSpecialization={setSelectedSpecialization} setSelectedDoctor={setSelectedDoctor} setSelectedVisitTime={setSelectedVisitTime}/>
            {selectedClinic ?
                <>
                <SpecializationSection specializations={specializations} setSelectedSpecialization={setSelectedSpecialization} setSelectedDoctor={setSelectedDoctor} setSelectedVisitTime={setSelectedVisitTime}/>
                {selectedSpecialization ?
                    <>
                    <DoctorsSection selectedSpecialization={selectedSpecialization} doctorsIDList={selectedClinic.doctorsList} doctorsInDB={doctorsInDB} setSelectedDoctor={setSelectedDoctor} setSelectedVisitTime={setSelectedVisitTime}/>
                    {selectedDoctor ?
                        <>
                        <TimetableSection doctorObj={selectedDoctor} setSelectedVisitTime={setSelectedVisitTime}/>
                        {selectedVisitTime ? 
                            <AppointmentSection selectedVisitTime={selectedVisitTime} setConfirmModalOpened={setConfirmModalOpened} SNILS={SNILS} LnameFname={LnameFname}/>
                            :
                            null
                        }
                        </>
                        :
                        null
                    }
                    </>
                    :
                    null
                }
                </>
                :
                null
            }
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        cartProducts: state.cartProducts
    }
}

export default connect(mapStateToProps, actionCreators)(Main);