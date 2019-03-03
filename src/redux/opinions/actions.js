import { RSAA } from 'redux-api-middleware';

export const getOpinions = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/opinions`,
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
