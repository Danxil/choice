import { getOpinions } from './actions';
import { put, takeEvery } from 'redux-saga/effects';

export default function* () {
  yield takeEvery([
    'VOTE_SUCCESS',
    'UNVOTE_SUCCESS',
    'ADD_OPINION_SUCCESS'
  ], function *({ meta: { candidateId, cb } }) {
    if (cb) cb();
    yield put(getOpinions({ candidateId }));
  });
}
