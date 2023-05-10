import { initialState, initialAuthFormData, initialJobFormData } from "./appContext";

import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    API_REQUEST_BEGIN,
    API_REQUEST_ERROR,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_LOGIN_SUCCESS,
    CLIENT_LOGIN_SUCCESS,
    CLIENT_REGISTER_SUCCESS,
    CANDIDATE_LOGIN_SUCCESS,
    CANDIDATE_REGISTER_SUCCESS,
    LOGOUT_USER,
    SET_AUTH_FORM_DATA,
    SET_JOB_FORM_DATA,
    ADD_JOB_SUCCESS,
    GET_JOBS_SUCCESS,
    GET_CLIENT_JOBS_SUCCESS
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

    if (action.type === SET_JOB_FORM_DATA) {
        return {
            ...state,
            jobFormData: action.payload.values
        }
    }

    if (action.type === API_REQUEST_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === API_REQUEST_ERROR) {
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
            alertText: "You have been logged out...",
            user: null,
            token: null
        }
    }

    if (action.type === ADD_JOB_SUCCESS) {
        return {
            ...state,
            showAlert: true,
            alertType: "success",
            alertText: "Job has been created.",
        }
    }
}

export default reducer;