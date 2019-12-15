import React from 'react';
import styled from 'styled-components';

import {useFormInput} from '../Other/functions';
import {Clinic} from '../../classes';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    position: absolute;
    bottom: 0;
    height: 100px;
    width: 200px;
    border-radius: 8px;
    background: beige;
    transition: .3s;
    visibility: hidden;
    opacity: .4;
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        visibility: hidden;
        input {
            text-align: center;
            width: 140px;
        }
        input[type='number'] {
            padding-left: 15px;
            width: 125px;
        }
    }
    button {
        visibility: hidden;
        border: 1px solid grey;
        border-radius: 3px;
        width: 90px;
        margin-top: 0;
    }
`;

const HospitalRoomBlock = styled.div`
    &:hover ${Form} {
        background: #fae7b5;
        height: 110px;
        visibility: visible;
        transition: .3s ease-out;
        opacity: 1;
        label {
            visibility: visible;
        }
        button {
            visibility: visible;
            margin-top: 5px;
        }
    }
    height: 100px;
    width: 200px;
    background: beige;
    border-radius: 8px;
    margin: 0px 10px 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    ul {
        list-style:none;
    }
`;

export default function HospitalRoomBlockComponent(props) {
    const [clinicObj, setClinicObj] = props.clinicState;
    let roomNumber = useFormInput(props.element.roomNumber);
    let capacity = useFormInput(props.element.capacity);

    const updateRoomCharacteristic = (e) => {
        e.preventDefault();
        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.name);
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = [];

        for (let i = 0; i < clinicObj.hospitalRoomsList.length; i++) {
            if (clinicObj.hospitalRoomsList[i].idRoom !== props.element.idRoom) {
                tempObj.hospitalRoomsList.push(clinicObj.hospitalRoomsList[i]);
            } else {
                tempObj.hospitalRoomsList.push(clinicObj.hospitalRoomsList[i]);
                tempObj.hospitalRoomsList[i].roomNumber = roomNumber.value;
                tempObj.hospitalRoomsList[i].capacity = capacity.value;
            }
        }

        setClinicObj(tempObj);
    }

    return (
        <HospitalRoomBlock>
            <ul>
                <li>№{props.element.roomNumber || ' -'}</li>
                <li>Вместимость: {props.element.capacity || '-'}</li>
                <li>Заполненность: {props.element.occupancy || '-'}</li>
            </ul>
            <Form>
                <label>Номер палаты: <input {...roomNumber}></input></label>
                <label>Вместимость: <input {...capacity} type='number' min={props.element.occupancy}></input></label>
                <button onClick={(e) => updateRoomCharacteristic(e)}>Обновить</button>
            </Form>
        </HospitalRoomBlock>
    )
}
