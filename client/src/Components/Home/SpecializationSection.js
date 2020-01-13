import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

import {ChoiceTitle, Section} from './Main';
import {Container} from '../Other/Container';
import {Blocks, Option} from '../Other/Option';

const SpecializationSection = (props) => {
    return (
        <Section>
            <Container>
                <ChoiceTitle>Выберите специализацию врача</ChoiceTitle>
                <Blocks>
                    {props.specializations.map((element, i) => {
                    return <Option key={i} onClick={() => {props.selectSpecialization(element)}}>{element}</Option>
                    })}
                </Blocks>
            </Container>
        </Section>
    )
}

const mapStateToProps = (state) => {
    return {
        specializations: state.specializations
    }
}

export default connect(mapStateToProps, actionCreators)(SpecializationSection);