import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {APIService} from '../Master/ApiService';
import {ChoiceTitle, Section} from './Main';
import {Blocks, Option} from '../Master/Option';
import {Container} from '../Master/Container';

export default function DoctorsSection(props) {
    const ApiService = new APIService();
    const [doctorsObjectsList, setDoctorsObjectsList] = useState([]);

    useEffect(() => {
        for (let i = 0; i < props.doctorsID.length; i++) {
            ApiService
                .getDoctor(props.doctorsID[i])
                .then(doctor => {
                    let tempArr = doctorsObjectsList;
                    tempArr.push(doctor);
                    setDoctorsObjectsList(tempArr);
                })
        }
    }, [props.doctorsInDB])

    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите врача</ChoiceTitle>
                <Blocks>
                    {doctorsObjectsList.map((element, i) => {
                        for (let j = 0; j < props.doctorsInDB.length; j++) {
                            if ((props.doctorsInDB[j].idDoctor === element) && (props.doctorsInDB[j].specialization === props.selectedSpecialization)) {
                                return <Option key={i} onClick={() => props.setSelectedDoctor(props.doctorsInDB[j])}>
                                    <img src={props.doctorsInDB[j].imgUrl} alt="" />
                                    {props.doctorsInDB[j].name}
                                </Option>
                            }
                        }
                    })}
                </Blocks>
            </Container>
        </Section>
    )
}
