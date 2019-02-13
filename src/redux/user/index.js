const initialState = {
  userInfo: null,
  userInfoRequestDone: false,
};

const userReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_USER_INFO_SUCCESS':
      return { ...state, userInfo: payload, userInfoRequestDone: true };
    case 'GET_USER_INFO_FAILURE':
      return { ...state, userInfoRequestDone: true };
    case 'LOGOUT_REQUEST':
      return { ...state, userInfo: null };
    case 'USER_UPDATED':
      return { ...state, userInfo: payload };
    case 'CREATE_WITHDRAW_SUCCESS':
      return { ...state, userInfo: { ...state.userInfo, balance: state.userInfo.balance - payload.amount } };
    default:
      return state;
  }
};

export default userReducer;
