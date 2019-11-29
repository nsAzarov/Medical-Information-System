import React, {Fragment, useState, useEffect} from 'react'
import styled from 'styled-components';

import ClinicsSection from './ClinicsSection';
import DoctorsSection from './DoctorsSection';
import SpecializationSection from './SpecializationSection';
import TimetableSection from './TimetableSection';
import LoginSection from './LoginSection';

import {APIService} from '../Master/ApiService';
import {Container} from '../Master/Container';
import {ModalBackground, DeleteModal} from '../Master/Modal';

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

export default function Main() {
    const ApiService = new APIService();
    //const [clinics, setClinics] = useState(JSON.parse(localStorage.getItem('clinics')));
    //const [doctorsInDB, setDoctorsInDB] = useState(JSON.parse(localStorage.getItem('doctors')));
    const [clinics, setClinics] = useState([]);
    const [doctorsInDB, setDoctorsInDB] = useState([]);

    useEffect(() => {
        ApiService
            .getAllClinics()
            .then(clinics => {
                setClinics(clinics);
                //setLoading(false);
            });
    }, []);

    useEffect(() => {
        ApiService
            .getAllDoctors()
            .then(doctors => {
                setDoctorsInDB(doctors);
                //setLoading(false);
            });
    }, []);

    const [selectedClinic, setSelectedClinic] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('')

    const [removableClinic, setRemovableClinic] = useState({});
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

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
    
    return (
        <Fragment>
            {deleteModalOpened ?
            <>
            <ModalBackground />
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
            <ClinicsSection clinics={clinics} doctorsInDB={doctorsInDB} setSelectedClinic={setSelectedClinic} setSpecializations={setSpecializations} setRemovableClinic={setRemovableClinic} setDeleteModalOpened={setDeleteModalOpened} setSelectedSpecialization={setSelectedSpecialization} setSelectedDoctor={setSelectedDoctor} />
            {selectedClinic ?
                <>
                <SpecializationSection specializations={specializations} setSelectedSpecialization={setSelectedSpecialization} setSelectedDoctor={setSelectedDoctor} />
                {selectedSpecialization ?
                    <>
                    <DoctorsSection selectedSpecialization={selectedSpecialization} doctorsID={selectedClinic.doctorsList} doctorsInDB={doctorsInDB} setSelectedDoctor={setSelectedDoctor} />
                    {selectedDoctor ?
                        <>
                        <TimetableSection doctorObj={selectedDoctor}/>
                        <LoginSection />
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
