import React, {useState} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import uniqid from 'uniqid';

import {Container} from '../Other/Container';
import {Clinic} from '../../classes';
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
    const createNewClinicObject = async (e) => {
        e.preventDefault();

        const id = uniqid();
        const newObj = new Clinic(id, ImgUrl.value, Name.value);
        newObj.name = newObj.clinicName;
        setNewObj(newObj);

        await axios
            .post("/AddClinic", {...newObj})
            .then(response => {console.log(response); setObjectCreatedSuccessfully(true)})
            .catch(error => {console.log(error)})

        setObjectCreatedSuccessfully(true);
    }
    return (
        <Container>
            <AddNewClinic>
                <Logo src={ImgUrl.value ? ImgUrl.value : 'https://izpk.ru/files/mark/nophoto600.jpg'}/>
                <ClinicName>
                    <input {...ImgUrl} placeholder="Ссылка на картинку с логотипом"></input>
                    <input {...Name} placeholder="Название клиники"></input>
                    <button onClick={(e) => createNewClinicObject(e)}>Создать</button>
                </ClinicName>
            </AddNewClinic>
            {objectCreatedSuccessfully ? 
            <Redirect to={{
                pathname: `/Clinic/${newObj.idClinic}`,
                state: {clinicObj: JSON.stringify(newObj)}
            }}/>
            :
            null}
        </Container>
    )
}
