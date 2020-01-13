import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

import {ChoiceTitle, Section} from './Main';
import {Blocks, Option} from '../Other/Option';
import {Container} from '../Other/Container';

const DoctorsSection = (props) => {
    const Scroll = () => {
        setTimeout(() => window.scrollTo(0, 500), 50)
    }
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите врача</ChoiceTitle>
                <Blocks>
                    {props.selectedClinic.doctorsList.map((element, i) => {
                        for (let j = 0; j < props.doctorsInDB.length; j++) {
                            if ((props.doctorsInDB[j].idDoctor === element) && (props.doctorsInDB[j].specialization === props.selectedSpecialization)) {
                                return <Option key={i} onClick={() => {props.selectDoctor(props.doctorsInDB[j]); Scroll()}}>
                                    <img src={props.doctorsInDB[j].imgUrl} alt="" />
                                    {props.doctorsInDB[j].name}
                                </Option>
                            }
                        }
                        return null
                    })}
                </Blocks>
            </Container>
        </Section>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedClinic: state.selectedClinic,
        selectedSpecialization: state.selectedSpecialization,
        selectedDoctor: state.selectedDoctor,
        selectedVisitTime: state.selectedVisitTime
    }
}

export default connect(mapStateToProps, actionCreators)(DoctorsSection);