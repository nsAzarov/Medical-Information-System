import React, {Fragment} from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

import {Clinic, HospitalRoom} from '../../classes';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    position: absolute;
    bottom: 0;
    height: 100px;
    width: 220px;
    background: beige;
    transition: .3s;
    visibility: hidden;
    transition: .3s ease-out;
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
        width: 80px;
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
    width: 220px;
    background: beige;
    margin: 0px 10px 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    ul {
        list-style:none;
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

const HospitalRooms = styled.div`
    width: 960px;
    display: flex;
    flex-wrap: wrap;
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

export default function RoomsSectionComponent(props) {
    const [clinicObj, setClinicObj] = props.clinicState;

    const addNewHospitalRoomObject = () => {
        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.clinicName);
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;

        const newHospitalRoomObject = new HospitalRoom(uniqid(), '', 0, 0, []);
        tempObj.hospitalRoomsList.push(newHospitalRoomObject);

        setClinicObj(tempObj);
    }
    
    return (
        <RoomsSection>
            <h3>Палаты в клинике</h3>
            <HospitalRooms>
                {clinicObj.hospitalRoomsList.map((element, i) => {
                    return <HospitalRoomBlock key={i}>
                            <ul>
                                <li>№{element.roomNumber || ' -'}</li>
                                <li>Вместимость: {element.capacity || '-'}</li>
                                <li>Заполненность: {element.occupancy || '-'}</li>
                            </ul>
                            <Form>
                                <label>Номер палаты: <input value={element.roomNumber}></input></label>
                                <label>Вместимость: <input value={element.capacity} type='number' min={element.occupancy}></input></label>
                                <button>Обновить</button>
                            </Form>
                        </HospitalRoomBlock>
                })}
                <HospitalRoomBlock onClick={() => addNewHospitalRoomObject()}>
                    <h4>Добавить палату</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" className='plus-img' width="24" height="24" viewBox="0 0 24 24" ><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                </HospitalRoomBlock>
            </HospitalRooms>
        </RoomsSection>
    )
}
