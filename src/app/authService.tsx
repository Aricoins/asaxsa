// import axios from 'axios';
// import { LOGIN } from './redux/authActions';


// const API_URL = 'https://dev-api.contender-logistics.draketechdev.ca/api/auth';

// export const authService = {

//   login: async (email: string, password: string, dispatch: any) => { // Pasa 'dispatch' como argumento
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     console.log(response.data, "respuesta")
//     const { user, token } = response.data;
//     dispatch({ type: LOGIN, payload: { user, token } });
//     return { user, token };
//   },

//   // logout: () => {
//   //   localStorage.removeItem('user');
//   //   localStorage.removeItem('token');
//   // }
// };
