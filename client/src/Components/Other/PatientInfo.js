import styled from 'styled-components';

export const PatientInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid grey;
    img {
        height: 300px;
    }
    table {
        tr {
            td {
                padding: 3px 7px;
                border-bottom: 1px solid whitesmoke;
            }
            td:nth-last-child(2) {
                font-weight: bold;
            }
        }
    }
`;