import React from 'react';
import styled from 'styled-components';

import {Container} from '../Other/Container';
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
