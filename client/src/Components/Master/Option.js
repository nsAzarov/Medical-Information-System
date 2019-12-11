import styled from 'styled-components';

export const Blocks = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const Option = styled.div`
    #clickable-area {
        cursor: pointer;
        position: absolute;
        height: 100%;
        width: 168px;
        left: 0;
    }
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    height: 100px;
    width: 198px;
    margin: 0 10px 10px 10px;
    transition: .3s;
    img {
        height: 100px;
    }
    a {
        position: absolute;
        top: 5px;
        right: 5px;
        height: 25px;
        width: 25px;
        img {
            height: 100%;
        }
    }
    button {
        position: absolute;
        right: 5px;
        z-index: 50;
        svg {
            height: 25px;
            width: 25px;
            fill: #ff5e5e;
            visibility: hidden;
        }
    }
    &:hover {
        box-shadow: 0px 0px 20px -10px rgba(0,0,0,0.5);
        button {
            svg {
                visibility: visible;
            }
        }
    }
`;