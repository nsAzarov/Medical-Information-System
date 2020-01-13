import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Other/Container';

const AppointmentForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    h4 {
        text-align: center;
    }
    input {
        height: 30px;
        width: 300px;
        margin-bottom: 10px;
        border-radius: 10px;
        border: 2px inset #dcdcdc;
        text-align: center;
        outline: none;
    }
    button {
        margin: 10px 50px;
        padding: 8px 14px;
        border: 1px solid beige;
        border-radius: 3px;
        background: beige;
        transition: .3s;
        &:hover {
            padding: 8px 24px;
            margin: 10px 40px;
        }
        &:active {
            border: 1px solid #fae7b5;
        }
    }
`;

const SelectedVisitTime = styled.div`
    font-size: 28px;
    margin-bottom: 20px;
`;

const AppointmentSection = (props) => {
    const [dayName, setDayName] = useState('');
    useEffect(() => {
        switch(props.selectedVisitTime.dayName) {
            case 'Пн.':
                setDayName('Понедельник')
                break
            case 'Вт.':
                setDayName('Вторник')
                break
            case 'Ср.':
                setDayName('Среда')
                break
            case 'Чт.':
                setDayName('Четверг')
                break
            case 'Пт.':
                setDayName('Пятница')
                break
            case 'Сб.':
                setDayName('Суббота')
                break
            case 'Вс.':
                setDayName('Воскресенье')
                break
            default:
                break
        }
    }, [props.selectedVisitTime])

    const confirmData = () => {
        window.scrollTo(0, 0);
    }

    return (
        <Section style={{paddingBottom: '60px'}}>
            <Container>
                <ChoiceTitle>Запись на приём</ChoiceTitle>
                <SelectedVisitTime>{dayName} {props.selectedVisitTime.timePeriod}</SelectedVisitTime>
                <AppointmentForm>
                    <h4>Ваш СНИЛС</h4>
                    <input {...props.SNILS}/>
                    <h4>Фамилия Имя</h4>
                    <input {...props.LnameFname}/>
                    <button onClick={e => {e.preventDefault(); props.setConfirmModalOpened(true); confirmData()}}>Записаться</button>
                </AppointmentForm>
            </Container>
        </Section>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedClinic: state.selectedClinic,
        selectedSpecialization: state.selectedSpecialization,
        selectedDoctor: state.selectedDoctor,
        selectedVisitTime: state.selectedVisitTime
    }
}

export default connect(mapStateToProps, actionCreators)(AppointmentSection);