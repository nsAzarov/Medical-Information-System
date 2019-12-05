import React from 'react';
import styled from 'styled-components';

const ReferralToAdditionalExamination = styled.div``;

const Treatment = styled.div``;

const Diagnosis = styled.div``;

const Anamnesis = styled.div``;

const PatientInfo = styled.div``;

const ExaminationWrap = styled.div`
    height: 700px;
`;

export default function Examination() {
    //в инфе о пациенте нужно отображать фото, имя, снилс, наличие страховки, ссылку на персональную страницу
    //создать коллекцию пациентов и схему пациента 
    //по выбору аппоинтмента делать гет запрос и получать пациента 
    //в анамнезе следующие текстареа
    //симптомы пациента
    //результаты осмотра
    //диагноз: предварительный и основной
    //лечение: лекарства и рекомендации
    //направление на дополнительные обследования (анализы, узи и прочее)
    return (
        <ExaminationWrap>
            <PatientInfo>

            </PatientInfo>
            <Anamnesis>

            </Anamnesis>
            <Diagnosis>

            </Diagnosis>
            <Treatment>

            </Treatment>
            <ReferralToAdditionalExamination>

            </ReferralToAdditionalExamination>
        </ExaminationWrap>
    )
}
