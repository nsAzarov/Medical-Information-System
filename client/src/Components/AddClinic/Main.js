import React, {useState} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import uniqid from 'uniqid';

import {Container} from '../Master/Container';
import {Clinic} from '../../classes';
import {useFormInput} from '../Master/functions';

const AddNewClinic = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled.img`
    height: 120px;
    width: 120px;
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

// Добавление логотипа
// добавление называния
// 
// заполнение врачами. два варианта. или выбрать из списка существующих, либо перенаправить на страницу создания нового врача.
// заполнение информации о палатах. Указать количество палат. На основании числа, появляется соответствующее количество палат
// в виде прямоугольников. Нажимая на каждый из них, выпадает модальное окно (или лучше увеличивается этот прямоугольник до размера почти всего экрана)
// В нём заполняем инфу: номер палаты, вместимость. Также здесь можно будет посмотреть список пациентов лежащих в этой палате и удалить 
// отдельных пациентов при желании. 
//
export default function Main() {
    const [objectCreatedSuccessfully, setObjectCreatedSuccessfully] = useState(false);
    const [idClinic, setIdClinic] = useState();
    const [newObj, setNewObj] = useState({});
    const imgUrl = useFormInput('');
    const name = useFormInput('');
    const createNewClinicObject = (e) => {
        e.preventDefault();

        const id = uniqid();
        const newObj = new Clinic(id, imgUrl.value, name.value);
        setNewObj(newObj);

        let clinics = JSON.parse(localStorage.getItem('clinics'));
        clinics.push(newObj);
        localStorage.setItem('clinics', JSON.stringify(clinics));

        setObjectCreatedSuccessfully(true);
    }
    return (
        <Container>
            <AddNewClinic>
                <Logo src={imgUrl.value ? imgUrl.value : 'https://izpk.ru/files/mark/nophoto600.jpg'}/>
                <ClinicName>
                    <input {...imgUrl} placeholder="Ссылка на картинку с логотипом"></input>
                    <input {...name} placeholder="Название клиники"></input>
                    <button onClick={(e) => createNewClinicObject(e)}>Создать</button>
                </ClinicName>
            </AddNewClinic>
            {objectCreatedSuccessfully ? 
            <Redirect to={{
                pathname: `/Clinic/${newObj.idClinic}`,
                state: {newObj}
            }}/>
            :
            null}
        </Container>
    )
}
