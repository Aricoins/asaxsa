import { AuthState, AuthActionTypes } from './authTypes'; // Importa los tipos AuthState y AuthActionTypes

const initialState: AuthState = {
  user: null,
  token: null,
};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      if ('payload' in action) {
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
        };
      }
      return state;
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
