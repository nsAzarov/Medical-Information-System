import styled from 'styled-components';

export const ModalBackground = styled.div`
    top: 0;
    position: absolute;
    height: ${props => props.height}px;
    width: 100%;
    background: whitesmoke;
    z-index: 50;
    opacity: 0.8;
`;

export const DeleteModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
    height: 370px;
    width: 360px;
    background: white;
    position: absolute;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -200px;
    z-index: 100;
    svg {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        height: 25px;
        width: 25px;
        margin: 5px;
    }
    img {
        height: 250px;
        margin-bottom: 10px;
    }
    span {
        display: flex;
        h5:last-child {
            margin-left: 5px;
        }
    }
    #btn-area {
        display: flex;
        margin-top: 5px;
        button {
            width: 60px;
            background: beige;
            border-radius: 3px;
            &:last-child {
                margin-left: 10px;
            }
        }
    }
`;