import React from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Master/Container';
import {AddNewBlock} from '../Master/AddNewBlock';

const AddNewClinic = styled(Link)`
    height: 100%;
    width: 100%;
    position: absolute;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
`;

const ClinicOption = styled.div`
    #clickable-area {
        cursor: pointer;
        position: absolute;
        height: 100%;
        width: 168px;
        left: 0;
    }
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    height: 100px;
    width: 198px;
    margin: 0 10px 10px 10px;
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
        button {
            svg {
                visibility: visible;
            }
        }
    }
`;

const ClinicsBlocks = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default function ClinicsSection(props) {
    const setSpecializationsArr = (clinic) => {
        let arr = [];
        for(let i = 0; i < clinic.doctorsList.length; i++) {
            if (arr.indexOf(clinic.doctorsList[i].specialization) === -1) {
                arr.push(clinic.doctorsList[i].specialization);
            }
        }
        props.setSpecializations(arr);
    }

    const deleteClinicFromDB = () => {
        let tempArr = [];
        for (let i = 0; i < props.clinics.length; i++) {
            //if (props.clinics[i].idClinic !== removableDoctor.idCoctor) {
            //    tempArr.push(props.clinics[i])
            //}
        }
        props.setClinics(tempArr);
        localStorage.setItem('clinics', JSON.stringify(tempArr));
    }

    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите клинику</ChoiceTitle>
                <ClinicsBlocks>
                    {props.clinics.map((element, i) => {
                        return <ClinicOption key={i} >
                            <div id='clickable-area' onClick={() => {setSpecializationsArr(props.clinics[i]); props.setSelectedClinic(props.clinics[i])}}></div>
                            <img src={element.imgUrl} alt="" />
                            <Link to={{
                                pathname: `/Clinic/${element.idClinic}`,
                                state: {clinicObj: JSON.stringify(element)}
                                }}>
                                <img src={require("../../images/edit.png")} alt="edit" />
                            </Link>
                            <button onClick={() => {props.setRemovableClinic(element); props.setDeleteModalOpened(true)}}><svg id="Layer_1" height="512" viewBox="0 0 128 128" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m121.5 16.442h-35.85v-9.942a1.75 1.75 0 0 0 -1.75-1.75h-39.8a1.75 1.75 0 0 0 -1.75 1.75v9.942h-35.85a1.75 1.75 0 0 0 -1.75 1.75v9a1.749 1.749 0 0 0 1.75 1.75h4.572l11.381 92.771a1.752 1.752 0 0 0 1.737 1.537h79.62a1.752 1.752 0 0 0 1.737-1.537l11.381-92.771h4.572a1.749 1.749 0 0 0 1.75-1.75v-9a1.75 1.75 0 0 0 -1.75-1.75zm-75.65-8.192h36.3v8.192h-36.3zm56.411 111.5h-76.522l-11.139-90.808h98.8zm17.489-94.308h-111.5v-5.5h111.5z"/><path d="m80.9 99.692h6a1.749 1.749 0 0 0 1.75-1.75v-50.192a1.75 1.75 0 0 0 -1.75-1.75h-6a1.75 1.75 0 0 0 -1.75 1.75v50.192a1.749 1.749 0 0 0 1.75 1.75zm1.754-50.192h2.5v46.692h-2.5z"/><path d="m61 99.692h6a1.749 1.749 0 0 0 1.75-1.75v-50.192a1.75 1.75 0 0 0 -1.75-1.75h-6a1.75 1.75 0 0 0 -1.75 1.75v50.192a1.749 1.749 0 0 0 1.75 1.75zm1.75-50.192h2.5v46.692h-2.5z"/><path d="m41.1 99.692h6a1.75 1.75 0 0 0 1.75-1.75v-50.192a1.751 1.751 0 0 0 -1.75-1.75h-6a1.75 1.75 0 0 0 -1.75 1.75v50.192a1.749 1.749 0 0 0 1.75 1.75zm1.746-50.192h2.5v46.692h-2.5z"/></svg></button>
                        </ClinicOption>
                    })}
                    <AddNewBlock>
                        <AddNewClinic to="/AddClinic" />
                        <h4>Добавить клинику</h4>
                        <svg xmlns="http://www.w3.org/2000/svg" className='plus-img' width="24" height="24" viewBox="0 0 24 24" ><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                    </AddNewBlock>
                </ClinicsBlocks>
            </Container>
        </Section>
    )
}
