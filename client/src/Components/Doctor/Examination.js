import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {APIService} from '../Master/ApiService';
import {MedicalExamination} from '../../classes';
import {useFormInput} from '../Master/functions';
import { Button } from '../Master/Button';

const ReferralToAdditionalExamination = styled.div`
    h2 {
        margin-top: 5px;
    }
    textarea {
        margin: 10px 5px 0px 5px;
        padding: 5px;
        min-width: 500px;
        max-width: 500px;
        min-height: 50px;
    }
`;

const Treatment = styled.div`
    border-bottom: 1px solid grey;
    h2 {
        margin-top: 5px;
    }
    textarea {
        margin: 10px 5px 20px 5px;
        padding: 5px;
        min-width: 500px;
        max-width: 500px;
        min-height: 70px;
    }
`;

const Diagnosis = styled.div`
    border-bottom: 1px solid grey;
    h2 {
        margin-top: 5px;
    }
    input {
        margin: 10px 5px 20px 5px;
        padding: 5px;
        width: 500px;
    }`;

const Anamnesis = styled.div`
    border-bottom: 1px solid grey;
    h2 {
        margin-top: 5px;
    }
    textarea {
        margin: 10px 5px 20px 5px;
        padding: 5px;
        min-width: 500px;
        max-width: 500px;
        min-height: 80px;
    }
`;

const PatientInfo = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid grey;
    img {
        height: 300px;
    }
    table {
        tr {
            td {
                padding: 3px 7px;
            }
            td:nth-last-child(2) {
                font-weight: bold;
            }
        }
    }
`;

const ExaminationWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default function Examination(props) {
    const [patientObj, setPatientObj] = useState();
    const symptoms = useFormInput('');
    const inspectionResults = useFormInput('');
    const diagnosis = useFormInput('');
    const medicines = useFormInput('');
    const recommendations = useFormInput('');
    const referralToAdditionalExamination = useFormInput('');
    
    useEffect(() => {
        const ApiService = new APIService();
        ApiService
            .getPatient(props.selectedAppointment.SNILS)
            .then(patient => {
                setPatientObj(patient);
                //setLoading(false);
            });
    }, [props.selectedAppointment])

    const createNewExaminationResults = () => {
        const newExamination = new MedicalExamination(symptoms.value, inspectionResults.value, diagnosis.value, medicines.value, recommendations.value, referralToAdditionalExamination.value)
        const idPatient = patientObj._id;
        axios
            .post('/CreateNewExaminationResults', {idPatient, newExamination})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
    }
    //в инфе о пациенте нужно отображать фото, имя, снилс, наличие страховки, ссылку на персональную страницу
    //в анамнезе следующие текстареа
    //симптомы пациента
    //результаты осмотра
    //диагноз: предварительный и основной
    //лечение: лекарства и рекомендации
    //направление на дополнительные обследования (анализы, узи и прочее)
    return (
        <ExaminationWrap>
            <PatientInfo>
                {patientObj ? 
                <>
                    <img src={patientObj.imgUrl} alt="" />
                    <table>
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
                    </table>
                </> 
                : null}
            </PatientInfo>
            <Anamnesis>
                <h2>Симптомы пациента:</h2>
                <textarea {...symptoms}></textarea>
                <h2>Результаты осмотра:</h2>
                <textarea {...inspectionResults}></textarea>
            </Anamnesis>
            <Diagnosis>
                <h2>Диагноз:</h2>
                <input {...diagnosis}></input>
            </Diagnosis>
            <Treatment>
                <h2>Лекарства:</h2>
                <textarea {...medicines}></textarea>
                <h2>Рекомендации:</h2>
                <textarea {...recommendations}></textarea>
            </Treatment>
            <ReferralToAdditionalExamination>
                <h2>Направления на доп. обследования:</h2>
                <textarea {...referralToAdditionalExamination}></textarea>
            </ReferralToAdditionalExamination>
            <Button onClick={() => createNewExaminationResults()}>Готово</Button>
        </ExaminationWrap>
    )
}
