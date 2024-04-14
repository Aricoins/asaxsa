import { LOGIN, LOGOUT } from './actions';
import { User } from '../redux/store';

// Define el tipo de estado
interface State {
  user: User | null; // Cambia el tipo de user a User | null
  token: string[]; // Mantén el tipo de token como string[]
}

// Define el tipo de acción
interface Action {
  type: string;
  payload: {
    user: User;
    token: string;
  };
}

// Define el estado inicial
const initialState: State = {
  user: null, // Inicializa user como null
  token: [],
};

// Define el reductor
const rootReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        user: null, // Cambia user a null al hacer logout
        token: [],
      };
    default:
      return state;
  }
};

export default rootReducer;
