import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

import {Appointment} from '../../classes';

const Confirm = styled.div`
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

const ConfirmModal = (props) => {
    const makeAppointmentWithDoctor = () => {
        let appointment = new Appointment(props.selectedClinic._id, props.selectedDoctor._id, props.selectedVisitTime.dayName, props.selectedVisitTime.timePeriod, props.SNILS.value, props.LnameFname.value);
        
        axios
            .post("/MakeAppointment", {...appointment})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
    }

    return (
        <Confirm>
            <svg onClick={() => props.setConfirmModalOpened(false)} height="511.992pt" viewBox="0 0 511.992 511.992" width="511.992pt" xmlns="http://www.w3.org/2000/svg"><path d="m415.402344 495.421875-159.40625-159.410156-159.40625 159.410156c-22.097656 22.09375-57.921875 22.09375-80.019532 0-22.09375-22.097656-22.09375-57.921875 0-80.019531l159.410157-159.40625-159.410157-159.40625c-22.09375-22.097656-22.09375-57.921875 0-80.019532 22.097657-22.09375 57.921876-22.09375 80.019532 0l159.40625 159.410157 159.40625-159.410157c22.097656-22.09375 57.921875-22.09375 80.019531 0 22.09375 22.097657 22.09375 57.921876 0 80.019532l-159.410156 159.40625 159.410156 159.40625c22.09375 22.097656 22.09375 57.921875 0 80.019531-22.097656 22.09375-57.921875 22.09375-80.019531 0zm0 0" fill="#e76e54"/></svg>
            <div>
                <div id="top-area">
                    <img src={props.selectedClinic.imgUrl} alt=""/>
                    <img src={props.selectedDoctor.imgUrl} alt=""/>
                    <div id="doctor-info">
                        {props.selectedDoctor.name}<br />
                        {props.selectedDoctor.specialization}<br />
                        Стаж: {props.selectedDoctor.experience}<br />
                    </div>
                </div>
                <div id="appointment-time">
                    {props.selectedVisitTime.dayName} {props.selectedVisitTime.timePeriod}
                </div>
                <div id="patient-info">
                    СНИЛС: {props.SNILS.value}<br />
                    Ваше Имя: {props.LnameFname.value}<br />
                </div>
            </div>
            <h3>Всё верно?</h3>
            <div id='btn-area'>
                <button onClick={() => {makeAppointmentWithDoctor(); props.setConfirmModalOpened(false)}}>Да</button>
                <button onClick={() => props.setConfirmModalOpened(false)}>Нет</button>
            </div>
        </Confirm>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedClinic: state.selectedClinic,
        selectedSpecialization: state.selectedSpecialization,
        selectedDoctor: state.selectedDoctor,
        selectedVisitTime: state.selectedVisitTime,
        confirmModalOpened: state.confirmModalOpened
    }
}

export default connect(mapStateToProps, actionCreators)(ConfirmModal);