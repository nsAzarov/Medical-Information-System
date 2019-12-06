import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const ToProfile = styled(Link)`
    display: inline-block;
    position: sticky;
    top: 10px;
    height: 120px;
    width: 140px;
    border: 2px solid grey;
    border-right: 0px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
`;

const AbsBlock = styled.div`
    display: inline-block;
    position: absolute;
    top: 120px;
    right: 2px;
    height: 100%;
    width: 140px;
`;

export default function LinkToProfile() {
    return (
        <AbsBlock>
            <ToProfile to='/Profile'>
            
            </ToProfile>
        </AbsBlock>
    )
}
