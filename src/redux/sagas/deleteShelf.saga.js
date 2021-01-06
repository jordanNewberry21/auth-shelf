import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteShelf(action) {
   try {
      yield axios.delete(`/api/shelf/${action.payload.itemId}/${action.payload.userId}`)
      yield put({ type: 'FETCH_SHELF' })
   } catch (error) {
      console.log('Shelf DELETE request failed', error);
   }
}

function* deleteShelfSaga() {
   yield takeLatest('DELETE_ITEM', deleteShelf);
}


export default deleteShelfSaga;