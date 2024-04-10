
import { Dispatch } from 'redux';
import { LOGIN_SUCCESS, LOGOUT } from './authTypes';
import { authService } from '../authService';

// Acción para iniciar sesión
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        // Llama al servicio de autenticación para iniciar sesión
        const { user, token } = await authService.login(email, password, dispatch);
        
        // Si el inicio de sesión es exitoso, despacha la acción LOGIN_SUCCESS
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user, token },
        });
    } catch (error) {
        // Maneja cualquier error que ocurra durante el inicio de sesión
        console.error(error);
    }
};

// Acción para cerrar sesión
export const logout = () => (dispatch: Dispatch) => {
    // Llama al servicio de autenticación para cerrar sesión
    authService.logout();
    
    // Despacha la acción LOGOUT para actualizar el estado de la autenticación
    dispatch({ type: LOGOUT });
};
