// authTypes.ts
export interface UserInfo {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    verification: {
        email: boolean;
    };
}

export interface AuthResponse {
    user: UserInfo;
    token: string;
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export interface AuthState {
    user: UserInfo | null;
    token: string | null;
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: AuthResponse;
}

export interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes = LoginSuccessAction | LogoutAction;
