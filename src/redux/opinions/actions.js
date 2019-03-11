import { RSAA } from 'redux-api-middleware';

export const getOpinions = ({ candidateId, verified = true }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}${!candidateId ?
        `/opinions?verified=${verified}` :
        `/candidates/${candidateId}/opinions?verified=${verified}`}`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_OPINIONS_REQUEST',
        'GET_OPINIONS_SUCCESS',
        'GET_OPINIONS_FAILURE'
      ]
    }
  };
};
export const addOpinion = ({ candidateId, values, cb }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/candidates/${candidateId}/opinions`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
      types: [
        'ADD_OPINION_REQUEST',
        {
          type: 'ADD_OPINION_SUCCESS',
          meta: { cb }
        },
        'ADD_OPINION_FAILURE'
      ]
    }
  };
};
export const vote = ({ opinionId, userId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/users/${userId}/opinions/${opinionId}/votes`,
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'VOTE_REQUEST',
        'VOTE_SUCCESS',
        'VOTE_FAILURE'
      ]
    }
  };
};
export const unvote = ({ opinionId, userId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/users/${userId}/opinions/${opinionId}/votes`,
      credentials: 'include',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'UNVOTE_REQUEST',
        'UNVOTE_SUCCESS',
        'UNVOTE_FAILURE'
      ]
    }
  };
};
export const verifyOpinion = ({ opinionId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/opinions/${opinionId}/verify`,
      credentials: 'include',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'VERIFY_OPINION_REQUEST',
        'VERIFY_OPINION_SUCCESS',
        'VERIFY_OPINION_FAILURE'
      ]
    }
  };
};
export const deleteOpinion = ({ opinionId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/opinions/${opinionId}`,
      credentials: 'include',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'DELETE_OPINION_REQUEST',
        'DELETE_OPINION_SUCCESS',
        'DELETE_OPINION_FAILURE'
      ]
    }
  };
};
