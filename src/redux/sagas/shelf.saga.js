import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addItemSaga(action) {
    try {
        yield axios.post('/api/shelf', action.payload);
        yield put({ type: 'FETCH_SHELF' })
    } catch (error) {
        console.log('error', error);
    }
}




function* shelfSaga() {
    yield takeLatest('ADD_ITEM', addItemSaga);
}

export default shelfSaga