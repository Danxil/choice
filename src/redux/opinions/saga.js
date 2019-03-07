import { getNotVerifiedOpinions, getOpinions } from './actions';
import { put, takeEvery, select } from 'redux-saga/effects';

export default function* () {
  yield takeEvery([
    'VOTE_SUCCESS',
    'UNVOTE_SUCCESS',
    'ADD_OPINION_SUCCESS',
    'SIGN_IN_SUCCESS',
    'SIGN_UP_SUCCESS',
    'LOGOUT_SUCCESS',
    'SET_ACTIVE_CANDIDATE_ID',
  ], function *({ meta }) {
    if (meta && meta.cb) meta.cb();
    const store = yield select();
    const { candidates: { activeCandidateId:  candidateId } } = store;
    yield put(getOpinions({ candidateId }));
  });
  yield takeEvery([
    'VERIFY_OPINION_SUCCESS',
    'DELETE_OPINION_SUCCESS',
  ], function *() {
    yield put(getNotVerifiedOpinions());
  });
}