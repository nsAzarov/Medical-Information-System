import React from 'react';
import styled from 'styled-components';

import {Button} from '../Master/Button';
import {useFormInput} from '../Master/functions';

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
        margin-bottom: 35px;
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
    height: 480px;
    width: 400px;
    border: 1px solid grey;
    border-radius: 20px;
    margin: 20px;
`;

export default function SignUpArea() {
    const imgUrl = useFormInput('');
    const name = useFormInput('');
    const SNILS = useFormInput('');
    const availabilityOfInsurance = useFormInput('');
    const password = useFormInput('');
    const passwordConfirm = useFormInput('');
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
                <Button>Зарегистрироваться</Button>
            </Form>
        </Wrapper>
    )
}
