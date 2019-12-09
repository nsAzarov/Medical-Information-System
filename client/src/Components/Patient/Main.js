import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {APIService} from '../Master/ApiService';
import {PatientInfo} from '../Master/PatientInfo';
import {Container} from '../Master/Container';

const SelectedExamResults = styled.div`
    padding: 5px;
    border: 5px solid beige;
    border-radius: 8px;
    margin-top: 20px;
`;

const ExamResults = styled.div`
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
    text-align: center;
    cursor: pointer;
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

const MedicalHistory = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    border-bottom: 1px solid grey;
`;

const PatientInfoSection = styled.section`
    width: 100%;
`;

export default function Main(props) {
    const [patientObj, setPatientObj] = useState();
    const [selectedExamResults, setSelectedExamResults] = useState('');
    
    useEffect(() => {
        const ApiService = new APIService();
        ApiService
            .getPatient(props.SNILS)
            .then(patient => {
                setPatientObj(patient);
                //setLoading(false);
            });
    }, [props.SNILS])

    return (
        <PatientInfoSection>
            <Container>
            {patientObj ?
            <>
                <PatientInfo>
                    <img src={patientObj.imgUrl} alt="" />
                    <table>
                        <tbody>
                            <tr>
                                <td>Имя:</td>
                                <td>{patientObj.name}</td>
                            </tr>
                            <tr>
                                <td>Возраст:</td>
                                <td>{patientObj.age}</td>
                            </tr>
                            <tr>
                                <td>Пол:</td>
                                <td>{patientObj.gender}</td>
                            </tr>
                            <tr>
                                <td>СНИЛС:</td>
                                <td>{patientObj.SNILS}</td>
                            </tr>
                            <tr>
                                <td>Наличие страховки:</td>
                                <td>{patientObj.availabilityOfInsurance}</td>
                            </tr>
                        </tbody>
                    </table>
                </PatientInfo>
                <MedicalHistory>
                    {patientObj.medicalHistory.map((examResults, i) => {
                        console.log(examResults)
                        return <ExamResults key={i} onClick={() => setSelectedExamResults(examResults)}>
                            {examResults.date}<br />
                            {examResults.diagnosis}
                        </ExamResults>
                    })}
                </MedicalHistory>
                {selectedExamResults ? 
                    <SelectedExamResults>
                        <h4>Дата</h4>{selectedExamResults.date}
                        <h4>Симптомы</h4>{selectedExamResults.symptoms}
                        <h4>Диагноз</h4>{selectedExamResults.diagnosis}
                        <h4>Лекарства</h4>{selectedExamResults.medicines}
                        <h4>Рекомендации</h4>{selectedExamResults.recommendations}
                        <h4>Направления на доп.обследования</h4>{selectedExamResults.referralToAdditionalExamination}
                    </SelectedExamResults>
                :null}
            </>
            :null}
            </Container>
        </PatientInfoSection>
    )
}
