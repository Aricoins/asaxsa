import axios from 'axios';
import { useDispatch } from 'react-redux';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT'; 

// Acción para iniciar sesión
export const login = (email: string, password: string) => async (dispatch: any) => {
    try {
        const response = await axios.post('https://dev-api.contender-logistics.draketechdev.ca/api/auth/login', {
            email,
            password,
        });
        console.log(response.data, "respuesta");

        // Dispatch the action with the data received from the response
        dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
        // Handle any error that occurs during login
        console.error('Error during login:', error);
    }
}
// Acción para cerrar sesión
export const logout = () => () => {
   const dispatch = useDispatch();
    // Despacha la acción LOGOUT para actualizar el estado de la autenticación
    dispatch({ type: LOGOUT , payload: null});
};
