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
`;

const NewDoctor = styled(Link)`

`;

const DoctorLine = styled.li`
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
    const {idClinic} = props;
    const [doctorsInDB, setDoctorsInDB] = useState(JSON.parse(localStorage.getItem('doctors')));
    const [clinicsInDB, setClinicsInDB] = useState(JSON.parse(localStorage.getItem('clinics')));
    let clinicObj;
    for (let i = clinicsInDB.length - 1; i > 0; i--) {
        if(clinicsInDB[i].idClinic == idClinic) {
            clinicObj = clinicsInDB[i];
            break;
        }
    }
    console.log(clinicObj);
    return (
        <Container>
            <ClinicInfoSection>
                <Logo src={'https://izpk.ru/files/mark/nophoto600.jpg'}/>
                <Info>
                    <h1>name.value</h1>
                    <h4>Количество врачей: </h4>
                    <h4>Количество палат: </h4>
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
                                return <DoctorLine item={element} key={i}>{element.idDoctor}</DoctorLine>
                            })}
                        </DoctorsList>
                    </ChooseDoctors>
                    <ChooseDoctors>
                        <h4>Работающие в клинике</h4>
                        <DoctorsList>
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
