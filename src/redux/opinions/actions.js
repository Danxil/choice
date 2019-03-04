import { RSAA } from 'redux-api-middleware';

export const getOpinions = ({ candidateId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/candidates/${candidateId}/opinions`,
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
          meta: { candidateId, cb }
        },
        'ADD_OPINION_FAILURE'
      ]
    }
  };
};
export const vote = ({ opinionId, userId, candidateId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/users/${userId}/opinions/${opinionId}/votes`,
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'VOTE_REQUEST',
        {
          type: 'VOTE_SUCCESS',
          meta: { candidateId }
        },
        'VOTE_FAILURE'
      ]
    }
  };
};
export const unvote = ({ opinionId, userId, candidateId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/users/${userId}/opinions/${opinionId}/votes`,
      credentials: 'include',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'UNVOTE_REQUEST',
        {
          type: 'UNVOTE_SUCCESS',
          meta: { candidateId }
        },
        'UNVOTE_FAILURE'
      ]
    }
  };
};
