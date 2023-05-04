import { initialState } from "./appContext";

import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    ADMIN_REGISTER_BEGIN,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_ERROR,
    ADMIN_LOGIN_BEGIN,
    ADMIN_LOGIN_ERROR,
    ADMIN_LOGIN_SUCCESS,
    CLIENT_LOGIN_BEGIN,
    CLIENT_LOGIN_ERROR,
    CLIENT_LOGIN_SUCCESS,
    CANDIDATE_LOGIN_BEGIN,
    CANDIDATE_LOGIN_ERROR,
    CANDIDATE_LOGIN_SUCCESS,
    CANDIDATE_REGISTER_BEGIN,
    CANDIDATE_REGISTER_ERROR,
    CANDIDATE_REGISTER_SUCCESS,
    LOGOUT_USER
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

    if (action.type === CANDIDATE_REGISTER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === CANDIDATE_REGISTER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Candidate Registration Successful, Redirecting...",
            user: action.payload.user,
            token: action.payload.token
        }
    }

    if (action.type === CANDIDATE_REGISTER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.message,
        }
    }

    if (action.type === CANDIDATE_LOGIN_BEGIN) {
        return {
            ...state,
            isLoading: true,
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
            token: action.payload.token
        }
    }

    if (action.type === CANDIDATE_LOGIN_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.message
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