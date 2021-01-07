import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editSaga(action) {
    try {
        console.log('In edit saga')
        const config = {
            withCredentials: true,
        };

        yield axios.put(`/api/shelf/${action.payload.itemId}/${action.payload.userId}/`, action.payload, config)
        yield put({ type: 'FETCH_SHELF' })
        console.log('Finished edit sga')
    } catch (error) {
        console.log('Shelf EDIT request failed', error);
    }
}

function* editShelfSaga() {
    yield takeLatest('EDIT_ITEM', editSaga);
}


export default editShelfSaga;