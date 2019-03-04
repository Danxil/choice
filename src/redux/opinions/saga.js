import { getOpinions } from './actions';
import { put, takeEvery } from 'redux-saga/effects';

export default function* () {
  yield takeEvery(['VOTE_SUCCESS', 'UNVOTE_SUCCESS'], function *({ meta: { candidateId } }) {
    yield put(getOpinions({ candidateId }));
  });
}
