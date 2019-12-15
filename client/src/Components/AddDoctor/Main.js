import React, {useState} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import uniqid from 'uniqid';

import {Container} from '../Other/Container';
import {Doctor, Visit} from '../../classes';
import {useFormInput} from '../Other/functions';

const AddNewClinic = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled.img`
    height: 120px;
    margin: 20px;
`;

const ClinicName = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 20px;
    width: 300px;
    input {
        height: 100%;
        width: 100%;
        margin-bottom: 5px;
        text-align: center;
    }
    button {
        height: 25px;
        width: 90px;
        margin-top: 10px;
        background: whitesmoke;
        border: 1px solid black;
        border-radius: 2px;
    }
`;

export default function Main() {
    const [objectCreatedSuccessfully, setObjectCreatedSuccessfully] = useState(false);
    const [newObj, setNewObj] = useState({});
    const ImgUrl = useFormInput('');
    const Name = useFormInput('');
    const Specialization = useFormInput('');
    const Age = useFormInput('');
    const Experience = useFormInput('');

    const createNewDoctorObject = (e) => {
        e.preventDefault();

        const dayNames = ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'];
        const timePeriods = [
            '09:00-09:20', '09:20-09:40', '09:40-10:00', 
            '10:00-10:20', '10:20-10:40', '10:40-11:00', 
            '11:00-11:20', '11:20-11:40', '11:40-12:00', 
            '12:00-12:20', '12:20-12:40', '12:40-13:00', 
            '13:00-13:20', '13:20-13:40', '13:40-14:00', 
            '14:00-14:20', '14:20-14:40', '14:40-15:00', 
            '15:00-15:20', '15:20-15:40', '15:40-16:00',  
            '16:00-16:20', '16:20-16:40', '16:40-17:00'];
        
        let schedule = [{dayName: 'Monday', visits: []}, 
                        {dayName: 'Tuesday', visits: []}, 
                        {dayName: 'Wednesday', visits: []}, 
                        {dayName: 'Thursday', visits: []}, 
                        {dayName: 'Friday', visits: []}, 
                        {dayName: 'Saturday', visits: []}, 
                        {dayName: 'Sunday', visits: []}];

        for (let i = 0; i < timePeriods.length; i++) {
            for (let j = 0; j < 7; j++) {
                const visitObj = new Visit(uniqid(), dayNames[j], timePeriods[i]);
                schedule[j].visits.push(visitObj);
            }
        }

        const id = uniqid();
        const newObj = new Doctor(id, ImgUrl.value, Name.value, Age.value, Specialization.value, Experience.value, schedule);
        setNewObj(newObj);
        
        axios
            .post("/AddDoctor", {idDoctor: newObj.idDoctor, imgUrl: ImgUrl.value, name: Name.value, specialization: Specialization.value, age: Age.value, experience: Experience.value, schedule})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})

        setObjectCreatedSuccessfully(true);
    }
    return (
        <Container>
            <AddNewClinic>
                <Logo src={ImgUrl.value ? ImgUrl.value : 'https://izpk.ru/files/mark/nophoto600.jpg'}/>
                <ClinicName>
                    <input {...ImgUrl} placeholder="Ссылка на фото"></input>
                    <input {...Name} placeholder="Ф.И.О"></input>
                    <input {...Specialization} placeholder="Специализация"></input>
                    <input {...Age} placeholder="Возраст"></input>
                    <input {...Experience} placeholder="Опыт работы"></input>
                    <button onClick={(e) => createNewDoctorObject(e)}>Создать</button>
                </ClinicName>
            </AddNewClinic>
            {objectCreatedSuccessfully ? 
            <Redirect to={{
                pathName: `/Doctor/${newObj.idDoctor}`,
                state: {doctorObj: JSON.stringify(newObj)}
            }}/>
            :
            null}
        </Container>
    )
}
