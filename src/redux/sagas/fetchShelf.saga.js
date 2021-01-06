import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchShelf() {
    try {
        const response = yield axios.get('/api/shelf')
        yield put({ type: 'SET_SHELF', payload: response.data})
    } catch (error) {
        console.log('Shelf GET request failed', error);
      }
}

function* shelfSaga() {
    yield takeLatest('FETCH_SHELF', fetchShelf);
  }


export default shelfSaga;