import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {Container} from './Container';

const LogoArea = styled.div`
    display: flex;
    align-items: center;
    #logo-name {
        font-size: 26px;
        font-weight: bold;
        line-height: 26px;
        color: #4552e6;
    }
`;

const HeaderSection = styled.header`
    height: 100px;
    width: 100%;
    background: whitesmoke;
    ${Container} {
        a {
            height: 100px;
            img {
                height: 100px;
            }
        }
    }
`;

export default function Header() {
    return (
        <HeaderSection>
            <Container>
                <LogoArea>
                    <Link to='/'><img src={require('../../images/logo2.png')} alt=""/></Link>
                    <div id='logo-name'>Medical<br />Information<br />System</div>
                </LogoArea>
            </Container>
        </HeaderSection>
    )
}
