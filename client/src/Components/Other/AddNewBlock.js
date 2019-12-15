import styled from 'styled-components';

export const AddNewBlock = styled.div`
    height: 100px;
    width: 198px;
    background: beige;
    border-radius: 8px;
    margin: 0px 10px 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    h4 {
        margin-bottom: 10px;
        transition: .3s;
    }
    .plus-img {
        height: 40px;
        width: 40px;
        fill: #ff9494;
        transition: .3s;
    }
    &:hover {
        h4 {
            margin-bottom: 5px;
        }
        .plus-img {
            height: 45px;
            width: 45px;
            fill: #ff5e5e;
        }
    }
`;
