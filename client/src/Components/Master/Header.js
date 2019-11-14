import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {Container} from './Container';

const LogoArea = styled(Link)`
    img {
        height: 100px;
    }
    display: flex;
    margin: auto;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    line-height: 26px;
    color: #4552e6;
    width: 240px;
    text-decoration: none;
    font-family: 'Work Sans', sans-serif;
`;

const HeaderSection = styled.header`
    height: 100px;
    width: 100%;
    background: whitesmoke;
`;

export default function Header() {
    return (
        <HeaderSection>
            <Container>
                <LogoArea to='/'>
                    <img src={require('../../images/logo2.png')} alt=""/>
                    Medical<br />Information<br />System
                </LogoArea>
            </Container>
        </HeaderSection>
    )
}
