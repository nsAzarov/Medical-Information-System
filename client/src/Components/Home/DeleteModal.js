import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

import {Delete} from '../Other/Modal';

const DeleteModal = (props) => {
    const deleteClinicFromDB = (_id) => {
        axios
            .post("/DeleteClinic", {_id})
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
    }

    return (
        <Delete>
            <svg onClick={() => props.setDeleteModalOpened(false)} height="511.992pt" viewBox="0 0 511.992 511.992" width="511.992pt" xmlns="http://www.w3.org/2000/svg"><path d="m415.402344 495.421875-159.40625-159.410156-159.40625 159.410156c-22.097656 22.09375-57.921875 22.09375-80.019532 0-22.09375-22.097656-22.09375-57.921875 0-80.019531l159.410157-159.40625-159.410157-159.40625c-22.09375-22.097656-22.09375-57.921875 0-80.019532 22.097657-22.09375 57.921876-22.09375 80.019532 0l159.40625 159.410157 159.40625-159.410157c22.097656-22.09375 57.921875-22.09375 80.019531 0 22.09375 22.097657 22.09375 57.921876 0 80.019532l-159.410156 159.40625 159.410156 159.40625c22.09375 22.097656 22.09375 57.921875 0 80.019531-22.097656 22.09375-57.921875 22.09375-80.019531 0zm0 0" fill="#e76e54"/></svg>
            <h4>Вы действительно хотите удалить эту клинику из Базы Данных?</h4>
            <img src={props.removableClinic.imgUrl} alt='logo-img' />
            <div id='btn-area'>
                <button onClick={() => {deleteClinicFromDB(props.removableClinic._id); props.setDeleteModalOpened(false)}}>Да</button>
                <button onClick={() => props.setDeleteModalOpened(false)}>Нет</button>
            </div>
        </Delete>
    )
}

const mapStateToProps = (state) => {
    return {
        deleteModalOpened: state.deleteModalOpened,
        removableClinic: state.removableClinic
    }
}

export default connect(mapStateToProps, actionCreators)(DeleteModal);