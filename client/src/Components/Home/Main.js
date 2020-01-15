import React, {Fragment, useState, useEffect} from 'react'
import styled from 'styled-components';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

import ConfirmModal from './ConfirmModal';
import DeleteModal from './DeleteModal';
import ClinicsSection from './ClinicsSection';
import DoctorsSection from './DoctorsSection';
import SpecializationSection from './SpecializationSection';
import TimetableSection from './TimetableSection';
import AppointmentSection from './AppointmentSection';

import {Container} from '../Other/Container';
import {ModalBackground} from '../Other/Modal';
import {useFormInput} from '../Other/functions';
import {APIService} from '../../classes';

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

const Main = (props) => {
    useEffect(() => {
        const ApiService = new APIService();
        ApiService
            .getAllClinics()
            .then(clinics => {
                props.setClinics(clinics);
                props.setClinicsLoading(false);
            });
        ApiService
            .getAllDoctors()
            .then(doctors => {
                props.setDoctors(doctors);
                props.setDoctorsLoading(false);
            });
    }, [props]);

    const SNILS = useFormInput('');
    const LnameFname = useFormInput('');

    const [windowHeight, setWindowHeight] = useState(document.body.offsetHeight);

    useEffect(() => {
        setWindowHeight(Math.max(window.screen.height, document.body.offsetHeight));
    }, [props.deleteModalOpened, props.confirmModalOpened])

    return (
        <Fragment>
            {props.deleteModalOpened ?
            <>
            <ModalBackground height={windowHeight} onClick={() => props.setDeleteModalOpened(false)}/>
            <DeleteModal />
            </>
            :
            null}
            {props.confirmModalOpened ?
            <>
            <ModalBackground height={windowHeight} onClick={() => props.setConfirmModalOpened(false)}/>
            <ConfirmModal SNILS={SNILS} LnameFname={LnameFname}/>
            </>
            :null}
            <ClinicsSection/>
            {props.selectedClinic ?
                <>
                <SpecializationSection />
                {props.selectedSpecialization ?
                    <>
                    <DoctorsSection/>
                    {props.selectedDoctor ?
                        <>
                        <TimetableSection />
                        {props.selectedVisitTime ? 
                            <AppointmentSection SNILS={SNILS} LnameFname={LnameFname}/>
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
        selectedClinic: state.selectedClinic,
        selectedSpecialization: state.selectedSpecialization,
        selectedDoctor: state.selectedDoctor,
        selectedVisitTime: state.selectedVisitTime,
        confirmModalOpened: state.confirmModalOpened,
        deleteModalOpened: state.deleteModalOpened
    }
}

export default connect(mapStateToProps, actionCreators)(Main);