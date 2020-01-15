import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

import {Delete} from '../Other/Modal';

const DeleteModal = (props) => {
    return (
        <Delete>
            <svg onClick={() => props.setDeleteModalOpened(false)} height="511.992pt" viewBox="0 0 511.992 511.992" width="511.992pt" xmlns="http://www.w3.org/2000/svg"><path d="m415.402344 495.421875-159.40625-159.410156-159.40625 159.410156c-22.097656 22.09375-57.921875 22.09375-80.019532 0-22.09375-22.097656-22.09375-57.921875 0-80.019531l159.410157-159.40625-159.410157-159.40625c-22.09375-22.097656-22.09375-57.921875 0-80.019532 22.097657-22.09375 57.921876-22.09375 80.019532 0l159.40625 159.410157 159.40625-159.410157c22.097656-22.09375 57.921875-22.09375 80.019531 0 22.09375 22.097657 22.09375 57.921876 0 80.019532l-159.410156 159.40625 159.410156 159.40625c22.09375 22.097656 22.09375 57.921875 0 80.019531-22.097656 22.09375-57.921875 22.09375-80.019531 0zm0 0" fill="#e76e54"/></svg>
            <h4>Вы действительно хотите удалить этого врача из Базы Данных?</h4>
            <img src={props.removableDoctor.imgUrl} alt=""/>
            <h5>{props.removableDoctor.name}</h5>
            <h5>{props.removableDoctor.specialization}</h5>
            <span>
                <h5>Возраст: {props.removableDoctor.age}</h5>
                <h5>Стаж: {props.removableDoctor.experience}</h5>
            </span>
            <div id='btn-area'>
                <button onClick={() => {//deleteDoctorFromDB(); 
                                        props.setDeleteModalOpened(false);}}>Да</button>
                <button onClick={() => props.setDeleteModalOpened(false)} >Нет</button>
            </div>
        </Delete>
    )
}

const mapStateToProps = (state) => {
    return {
        deleteModalOpened: state.deleteModalOpened,
        removableDoctor: state.removableDoctor
    }
}

export default connect(mapStateToProps, actionCreators)(DeleteModal);