import { RSAA } from 'redux-api-middleware';

export const getUserInfo = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/user`,
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      'GET_USER_INFO_REQUEST',
      { type: 'GET_USER_INFO_SUCCESS', meta: { spinnerKeys: { LOGIN: false } } },
      { type: 'GET_USER_INFO_FAILURE', meta: { spinnerKeys: { LOGIN: false } } },
    ]
  }
});

export const signIn = ({ values }) => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/auth/local`,
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
    types: [
      { type: 'SIGN_IN_REQUEST', meta: { spinnerKeys: { LOGIN: true } } },
      { type: 'SIGN_IN_SUCCESS', meta: { spinnerKeys: { LOGIN: true } } },
      { type: 'SIGN_IN_FAILURE', meta: { spinnerKeys: { LOGIN: false } } },
    ]
  }
});
export const signUp = ({ values }) => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/sign-up`,
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
    types: [
      { type: 'SIGN_UP_REQUEST', meta: { spinnerKeys: { LOGIN: true } } },
      { type: 'SIGN_UP_SUCCESS', meta: { spinnerKeys: { LOGIN: false } } },
      { type: 'SIGN_UP_FAILURE', meta: { spinnerKeys: { LOGIN: false } } },
    ]
  }
});
export const logout = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/logout`,
    method: 'GET',
    credentials: 'include',
    types: [
      'LOGOUT_REQUEST',
      'LOGOUT_SUCCESS',
      'LOGOUT_FAILURE',
    ]
  }
});
export const verifyUser = ({ userId, socialId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/users/${userId}/verify`,
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify({ socialId }),
      headers: { 'Content-Type': 'application/json' },
      types: [
        'VERIFY_USER_REQUEST',
        'VERIFY_USER_SUCCESS',
        'VERIFY_USER_FAILURE'
      ]
    }
  };
};
export const deleteUser = ({ userId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/users/${userId}`,
      credentials: 'include',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'DELETE_USER_REQUEST',
        'DELETE_USER_SUCCESS',
        'DELETE_USER_FAILURE'
      ]
    }
  };
};
export const getNotVerifiedUsers = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/users`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_NOT_VERIFIED_USERS_REQUEST',
        'GET_NOT_VERIFIED_USERS_SUCCESS',
        'GET_NOT_VERIFIED_USERS_FAILURE'
      ]
    }
  };
};
