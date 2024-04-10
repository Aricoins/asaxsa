import axios from 'axios';


const API_URL = 'https://dev-api.contender-logistics.draketechdev.ca/api/auth';

export const authService = {

  login: async (email: string, password: string, dispatch: any) => { // Pasa 'dispatch' como argumento
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { user, token } = response.data;
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
    
    return { user, token };
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};
