import styled from 'styled-components';

export const Schedule = styled.div`
    h3 {
        width: 100%;
        text-align: center;
        margin: 25px;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const DayBlock = styled.div`

`;

export const ScheduleBlock = styled.div`
    cursor: pointer;
    height: 40px;
    width: 155px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    text-align: center;
    background: ${props => props.active ? 'white' : 'whitesmoke'};
    &:hover {
        border: 1px solid black;
    }
`;