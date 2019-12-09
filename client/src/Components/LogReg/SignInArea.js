import React, {useState} from 'react';
import {Redirect} from 'react-router';
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
        margin-bottom: 40px;
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

export default function SignInArea() {
    const SNILS = useFormInput('');
    const password = useFormInput('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);

    const tryToEnterPersonalAccount = () => {
        setLoginSuccessful(true);
    }

    return (
        <Wrapper>
            <Form>
                <h2>Вход в личный кабинет</h2>
                <Input>
                    <h4>СНИЛС</h4>
                    <input {...SNILS}/>
                </Input>
                <Input>
                    <h4>Пароль</h4>
                    <input {...password}/>
                </Input>
                <Button onClick={() => tryToEnterPersonalAccount()}>Вход</Button>
                {loginSuccessful ? 
                    <Redirect to={{
                        pathname: `/Patient/${SNILS.value}`,
                        state: {SNILS: SNILS.value}
                    }}/>
                :null}
            </Form>
        </Wrapper>
    )
}
