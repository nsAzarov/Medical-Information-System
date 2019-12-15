import styled from 'styled-components';
import {Container} from './Container';

export const InfoSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    ${Container} {
        flex-direction: row;
        padding-bottom: 0;
    }
`;