import userActions from './constants';

const initialState = {
  connected: false,
  firstname: '',
  lastname: '',
  email: '',
  image: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.SIGN_IN:
      return {
        ...state,
        connected: true,
        firstname: action.firstname,
        lastname: action.lastname,
        email: action.email,
      };
    case userActions.SIGN_OUT:
      return {
        ...state,
        connected: false,
        firstname: '',
        lastname: '',
      };
    default:
      return state;
  }
}
