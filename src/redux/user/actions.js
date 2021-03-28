import userActions from './constants';

export function connectUser(firstname, lastname, email) {
  return async function (dispatch) {
    dispatch({
      type: userActions.SIGN_IN,
      firstname: firstname,
      lastname: lastname,
      email: email,
    });
  };
}

export function disconnectUser() {
  return async function (dispatch) {
    dispatch({type: userActions.SIGN_OUT});
  };
}
