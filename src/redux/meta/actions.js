import { RSAA } from 'redux-api-middleware';

export const getMeta = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/meta`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_META_REQUEST',
        'GET_META_SUCCESS',
        'GET_META_FAILURE'
      ]
    }
  };
};
