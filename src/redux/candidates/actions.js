import { RSAA } from 'redux-api-middleware';

export const getCandidates = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/candidates`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_CANDIDATES_REQUEST',
        'GET_CANDIDATES_SUCCESS',
        'GET_CANDIDATES_FAILURE'
      ]
    }
  };
};
export const setActiveCandidateId = (activeCandidateId) => {
  return { type: 'SET_ACTIVE_CANDIDATE_ID', payload: activeCandidateId };
};
