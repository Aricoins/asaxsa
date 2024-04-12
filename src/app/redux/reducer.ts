import { LOGIN, LOGOUT } from './actions';

type State = {
  user: any[];
  token: any[];
};

type Action = {
  type: string;
  payload: {
    user: any;
    token: any;
  };
};

const initialState: State = {
  user: [],
  token: [],
};

const rootReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: [...state.user, action.payload.user],
        token: [...state.token, action.payload.token],
      };
    case LOGOUT:
      return {
        ...state,
        //user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default rootReducer;