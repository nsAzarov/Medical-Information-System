import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {Button} from '../Other/Button';
import {Patient} from '../../classes';
import {useFormInput} from '../Other/functions';

const Input = styled.div`
    h4 {
        text-align: center;
    }
    input {
        width: 100%;
        text-align: center;
        border: 1px solid #a5a5a5;
        border-radius: 3px;
    }
    margin-bottom: 10px;
`;

const Form = styled.form`
    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 75%;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 530px;
    width: 400px;
    border: 1px solid grey;
    border-radius: 20px;
    margin: 20px;
`;

export default function SignUpArea() {
    const imgUrl = useFormInput('');
    const name = useFormInput('');
    const gender = useFormInput('');
    const age = useFormInput('');
    const SNILS = useFormInput('');
    const availabilityOfInsurance = useFormInput('');
    const password = useFormInput('');
    const passwordConfirm = useFormInput('');
    
    const RegisterNewPatient = () => {
        const newPatient = new Patient(imgUrl.value, name.value, age.value, gender.value, SNILS.value, availabilityOfInsurance.value)
        axios
            .post('/RegisterNewPatient', {...newPatient})
            .then(response => {
                if (response.statusText === 'OK') {
                    window.location.reload(); 
                }
            })
            .catch(error => {console.log(error)})
    }

    return (
        <Wrapper>
            <Form>
                <h2>Регистрация</h2>
                <Input>
                    <h4>Ссылка на фотографию</h4>
                    <input {...imgUrl}/>
                </Input>
                <Input>
                    <h4>Фамилия Имя</h4>
                    <input {...name}/>
                </Input>
                <Input>
                    <h4>Пол</h4>
                    <input {...gender}/>
                </Input>
                <Input>
                    <h4>Возраст</h4>
                    <input {...age}/>
                </Input>
                <Input>
                    <h4>СНИЛС</h4>
                    <input {...SNILS}/>
                </Input>
                <Input>
                    <h4>Наличие страховки</h4>
                    <input {...availabilityOfInsurance}/>
                </Input>
                <Input>
                    <h4>Пароль</h4>
                    <input {...password}/>
                </Input>
                <Input>
                    <h4>Повторите пароль</h4>
                    <input {...passwordConfirm}/>
                </Input>
                <Button onClick={(e) => {e.preventDefault(); RegisterNewPatient()}}>Зарегистрироваться</Button>
            </Form>
        </Wrapper>
    )
}
