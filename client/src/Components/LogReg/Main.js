import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {Container} from '../Master/Container';
import SignInArea from './SignInArea';
import SignUpArea from './SignUpArea';

const LoginSection = styled.section`
    width: 100%;
`;

export default function Main() {
    return (
        <LoginSection>
            <Container style={{display: 'flex', flexDirection: 'row'}}>
                <SignInArea />
                <SignUpArea />
            </Container>
        </LoginSection>
    )
}
