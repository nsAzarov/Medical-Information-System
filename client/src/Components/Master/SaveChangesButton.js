import styled from 'styled-components';

export const SaveChangesButton = styled.button`
    padding: 8px 14px;
    margin: 20px auto 50px;
    border: 1px solid beige;
    border-radius: 3px;
    background: beige;
    transition: padding .3s;
    &:hover {
        padding: 8px 24px;
    }
    &:active {
        border: 1px solid #fae7b5;
    }
`;