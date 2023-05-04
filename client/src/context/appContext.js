import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";

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
    CANDIDATE_REGISTER_ERROR,
    CANDIDATE_REGISTER_BEGIN,
    CANDIDATE_REGISTER_SUCCESS,
    LOGOUT_USER
} from "./actions";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || null;

const initialState = {
    isLoading: false,
    showAlert: false,
    alertType: "",
    alertText: "",
    user,
    token
};

const appContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // to display a alert
    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    }

    // to clear a alert
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 4000);
    }

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    // to register a candidate
    const registerCandidate = async (newCandidate) => {
        dispatch({ type: CANDIDATE_REGISTER_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/register`, newCandidate);
            const { user, token } = data;

            addUserToLocalStorage({ user, token });
            dispatch({ type: CANDIDATE_REGISTER_SUCCESS, payload: { user, token } });
        } catch (error) {
            dispatch({
                type: CANDIDATE_REGISTER_ERROR,
                payload: { message: error.response.data.message }
            });
        }
        clearAlert();
    }

    // to login a candidate
    const loginCandidate = async (candidate) => {
        dispatch({ type: CANDIDATE_LOGIN_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/login`, candidate);
            const { user, token } = data;
            addUserToLocalStorage({ user, token });
            dispatch({ type: CANDIDATE_LOGIN_SUCCESS, payload: { user, token } });
        } catch (error) {
            dispatch({ type: CANDIDATE_LOGIN_ERROR, payload: { message: error.response.data.message } });
        }
        clearAlert();
    }

    // logout a user
    const logoutUser = () => {
        removeUserFromLocalStorage();
        dispatch({ type: LOGOUT_USER });
        clearAlert();
    }

    return <appContext.Provider value={{
        ...state,
        displayAlert,
        registerCandidate,
        loginCandidate,
        logoutUser
    }}>
        {children}
    </appContext.Provider>
}

const useAppContext = () => {
    return useContext(appContext);
}

export { initialState, AppProvider, useAppContext };