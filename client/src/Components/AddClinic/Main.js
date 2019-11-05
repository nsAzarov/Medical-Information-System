import React from 'react';
import styled from 'styled-components';

import {Container} from '../Master/Container';

const AddNewClinic = styled.div`
    width: 100%;
`;

const Logo = styled.div`
    height: 120px;
    width: 120px;
    border: 1px solid black;
    border-radius: 60px;
    margin: 20px auto;
`;

const ClinicName = styled.form`
    height: 20px;
    width: 300px;
    margin: auto;
    input {
        height: 100%;
        width: 100%;
    }
    button {
        height: 25px;
        width: 90px;
        position: absolute;
        left: 50%;
        margin-left: -40px;
        margin-top: 10px;
        background: whitesmoke;
        border: 1px solid black;
        border-radius: 2px;
    }
`;

//Добавление логотипа
//добавление называния
//
//заполнение врачами. два варианта. или выбрать из списка существующих, либо перенаправить на страницу создания нового врача.
//заполнение информации о палатах. Указать количество палат. На основании числа, появляется соответствующее количество палат
// в виде прямоугольников. Нажимая на каждый из них, выпадает модальное окно (или лучше увеличивается этот прямоугольник до размера почти всего экрана)
// В нём заполняем инфу: номер палаты, вместимость. Также здесь можно будет посмотреть список пациентов лежащих в этой палате и удалить 
// отдельных пациентов при желании. 
//
export default function Main() {
    return (
        <Container>
            <AddNewClinic>
                <Logo />
                <ClinicName>
                    <input></input>
                    <button>Создать</button>
                </ClinicName>
            </AddNewClinic>
        </Container>
    )
}
