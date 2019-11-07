import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {Container} from '../Master/Container';
import {useFormInput} from '../Master/functions';

const Logo = styled.img`
    height: 120px;
    width: 120px;
    margin: 20px;
`;

const ClinicInfoSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Info = styled.div`

`;

const DoctorsSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
        display: inline-block;
        margin: 20px;
    }
`;

const ChoosingArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChooseDoctors = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
        display: inline-block;
    }
`;

const DoctorsList = styled.div`
    height: 200px;
    width: 400px;
    border: 1px solid grey;
    border-radius: 3px;
    margin: 0px 20px;
    overflow: auto;
`;

const NewDoctor = styled(Link)`

`;

const DoctorLine = styled.li`
    list-style-type: none;
`;

const WardsSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
export default function Main(props) {
    //const {clinicObj} = props;
    const [clinicObj, setClinicObj] = useState(props.clinicObj);
    const [doctorsInDB, setDoctorsInDB] = useState(JSON.parse(localStorage.getItem('doctors')));
    const [clinicsInDB, setClinicsInDB] = useState(JSON.parse(localStorage.getItem('clinics')));
    /*let clinicObj;
    for (let i = clinicsInDB.length - 1; i > 0; i--) {
        if(clinicsInDB[i].idClinic == idClinic) {
            clinicObj = clinicsInDB[i];
            break;
        }
    }*/
    const AddToDoctorsList = (doctorObj) => {
        let tempObj = {...clinicObj};
        tempObj.doctorsList.push(doctorObj);
        setClinicObj(tempObj);
        /*for (let i = 0; i < clinicsInDB.length; i++) {
            if(clinicsInDB[i].idClinic === clinicObj.idClinic) {
                clinicsInDB[i] = clinicObj;
                break;
            }
        }
        localStorage.setItem('clinics', JSON.stringify(clinicsInDB));*/
        //А НАДО ЛИ МНЕ В ЭТОЙ ФУНКЦИИ МЕНЯТЬ LOCALSTORAGE?
        //МОЖЕТ ПОМЕНЯТЬ ЕГО ТОЛЬКО ПОСЛЕ НАЖАТИЯ НА КНОПКУ "СОХРАНИТЬ"?
    }
    const RemoveFromDoctorsList = (doctorObj) => {
        let tempObj = {...clinicObj};
        let tempDoctorsList = [];
        for(let i = 0; i < tempObj.doctorsList.length; i++) {
            if (tempObj.doctorsList[i].idDoctor !== doctorObj.idDoctor) {
                tempDoctorsList.push(tempObj.doctorsList[i]);
            }
        }
        tempObj.doctorsList = tempDoctorsList;
        setClinicObj(tempObj);
    }
    return (
        <Container>
            <ClinicInfoSection>
                <Logo src={clinicObj.imgUrl ? clinicObj.imgUrl : 'https://izpk.ru/files/mark/nophoto600.jpg'}/>
                <Info>
                    <h1>{clinicObj.clinicName}</h1>
                    <h4>Количество врачей: {clinicObj.doctorsList.length}</h4>
                    <h4>Количество палат: {clinicObj.wardsNumber}</h4>
                </Info>
            </ClinicInfoSection>
            <hr />
            <DoctorsSection>
                <h3>Добавьте врачей</h3>
                <ChoosingArea>
                    <ChooseDoctors>
                        <h4>Все врачи в базе данных</h4>
                        <DoctorsList>
                            <NewDoctor to='/AddNewDoctor'>Новый врач +</NewDoctor>
                            {doctorsInDB.map((element, i) => {
                                return <DoctorLine key={i} onClick={() => {AddToDoctorsList(element)}}>{element.idDoctor}</DoctorLine>
                            })}
                        </DoctorsList>
                    </ChooseDoctors>
                    <ChooseDoctors>
                        <h4>Работающие в клинике</h4>
                        <DoctorsList>
                            {clinicObj.doctorsList.map((element, i) => {
                                return <DoctorLine key={i} onClick={() => {RemoveFromDoctorsList(element)}}>{element.idDoctor}</DoctorLine>
                            })}
                        </DoctorsList>
                    </ChooseDoctors>
                </ChoosingArea>
            </DoctorsSection>
            <hr />
            <WardsSection>
            </WardsSection>
        </Container>
    )
}
