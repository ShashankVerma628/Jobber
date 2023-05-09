import { initialState, initialAuthFormData } from "./appContext";

import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    AUTH_BEGIN,
    AUTH_ERROR,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_LOGIN_SUCCESS,
    CLIENT_LOGIN_SUCCESS,
    CLIENT_REGISTER_SUCCESS,
    CANDIDATE_LOGIN_SUCCESS,
    CANDIDATE_REGISTER_SUCCESS,
    LOGOUT_USER,
    SET_AUTH_FORM_DATA
} from "./actions";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: "danger",
            alertText: "Please provide all values"
        }
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertText: ""
        }
    }

    if (action.type === SET_AUTH_FORM_DATA) {
        return {
            ...state,
            authFormData: action.payload.values
        }
    }
    
    if (action.type === AUTH_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === AUTH_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.message,
        }
    }

    
    // for candidates
    if (action.type === CANDIDATE_REGISTER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Candidate Registration Successful, Redirecting...",
            user: action.payload.user,
            token: action.payload.token,
            authFormData: initialAuthFormData
        }
    }

    if (action.type === CANDIDATE_LOGIN_SUCCESS) {
        return {
            ...state,
            isLoading: true,
            showAlert: true,
            alertType: "success",
            alertText: "Login Successful, Redirecting...",
            user: action.payload.user,
            token: action.payload.token,
            authFormData: initialAuthFormData
        }
    }


    if (action.type === CLIENT_REGISTER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Client Registration Successful, Redirecting...",
            user: action.payload.user,
            token: action.payload.token,
            authFormData: initialAuthFormData
        }
    }

    if (action.type === CLIENT_LOGIN_SUCCESS) {
        return {
            ...state,
            isLoading: true,
            showAlert: true,
            alertType: "success",
            alertText: "Login Successful, Redirecting...",
            user: action.payload.user,
            token: action.payload.token,
            authFormData: initialAuthFormData
        }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            showAlert: true,
            alertType: "success",
            alertText: "You have been logged out,Redirecting....",
            user: null,
            token: null
        }
    }
}

export default reducer;