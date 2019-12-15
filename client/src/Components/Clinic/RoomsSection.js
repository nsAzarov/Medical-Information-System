import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import uniqid from 'uniqid';

import HospitalRoomBlock from './HospitalRoomBlock';
import {AddNewBlock} from '../Other/AddNewBlock';
import {Clinic, HospitalRoom} from '../../classes';
import { Container } from '../Other/Container';

const HospitalRooms = styled.div`
    width: 100%;
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
    ${Container} {
        padding-bottom: 0;
    }
`;

export default function RoomsSectionComponent(props) {
    const [clinicObj, setClinicObj] = props.clinicState;

    const addNewHospitalRoomObject = () => {
        let tempObj = new Clinic(clinicObj.idClinic, clinicObj.imgUrl, clinicObj.name);
        tempObj._id = clinicObj._id;
        tempObj.doctorsList = clinicObj.doctorsList;
        tempObj.hospitalRoomsList = clinicObj.hospitalRoomsList;

        const newHospitalRoomObject = new HospitalRoom(uniqid(), '', 0, 0, []);
        tempObj.addNewHospitalRoom(newHospitalRoomObject);

        setClinicObj(tempObj);

        axios
            .post("/AddNewHospitalRoom", {_id: clinicObj._id, idRoom: newHospitalRoomObject.idRoom})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
    }
    
    return (
        <RoomsSection>
            <Container>
                <h3>Палаты в клинике</h3>
                <HospitalRooms>
                    {clinicObj.hospitalRoomsList.map((element, i) => {
                        return <HospitalRoomBlock key={i} element={element} clinicState={[clinicObj, setClinicObj]} />
                    })}
                    <AddNewBlock onClick={() => addNewHospitalRoomObject()}>
                        <h4>Добавить палату</h4>
                        <svg xmlns="http://www.w3.org/2000/svg" className='plus-img' width="24" height="24" viewBox="0 0 24 24" ><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                    </AddNewBlock>
                </HospitalRooms>
            </Container>
        </RoomsSection>
    )
}
