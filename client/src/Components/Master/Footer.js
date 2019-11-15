import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const FooterSection = styled.footer`
    position: fixed;
    bottom: 0px;
    height: 30px;
    width: 100%;
    background: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: pre-wrap;
    font-style: italic;
    color: #4552e6;
    a {
        color: inherit;
    }
`;

export default function Footer() {
    return (
        <FooterSection>
            Азаров Никита 4210 <a href='https://github.com/nsAzarov/Medical-Information-System'>https://github.com/nsAzarov/Medical-Information-System</a>
        </FooterSection>
    )
}
