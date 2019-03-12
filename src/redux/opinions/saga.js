import { getOpinions } from './actions';
import { put, takeEvery, select } from 'redux-saga/effects';

export default function* () {
  yield takeEvery([
    'ADD_OPINION_SUCCESS',
    'SIGN_IN_SUCCESS',
    'SIGN_UP_SUCCESS',
    'LOGOUT_SUCCESS',
    'SET_ACTIVE_CANDIDATE_ID',
  ], function *({ meta }) {
    if (meta && meta.cb) meta.cb();
    const store = yield select();
    const { candidates: { activeCandidateId:  candidateId } } = store;
    if (candidateId) yield put(getOpinions({ candidateId }));
  });
  yield takeEvery([
    'VERIFY_USER_SUCCESS',
    'VERIFY_OPINION_SUCCESS',
    'DELETE_OPINION_SUCCESS',
  ], function *() {
    const store = yield select();
    const { candidates: { activeCandidateId:  candidateId } } = store;
    yield put(getOpinions({ verified: false, candidateId }));
  });
}
