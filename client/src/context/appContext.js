import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";

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
    SET_AUTH_FORM_DATA,
    SET_AUTH_CLIENT_FORM_DATA,
    LOGOUT_USER,
    SET_JOB_FORM_DATA,
    ADD_JOB_SUCCESS,
    GET_CLIENT_JOBS_SUCCESS,
    GET_JOBS_SUCCESS,
    GET_ALL_JOBS_SUCCESS,
    GET_SINGLE_JOB_SUCCESS,
    GET_CLIENT_DETAILS_SUCCESS,
    DELETE_JOB_SUCCESS,
    EDIT_JOB_SUCCESS,
    JOB_APPLY_SUCCESSFUL,
    GET_CANDIDATE_JOBS_SUCCESS,
    SAVE_JOB_SUCCESS,
    GET_SAVED_JOBS_SUCCESS,
    APPLICANT_DETAILS_SUCCESS
} from "./actions";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || null;

const initialAuthFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const initialAuthClientFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const initialJobFormData = {
    position: "",
    jobDescription: "",
    skills: "",
    jobType: "remote",
    jobLocation: "",
    salary: ""
};

const initialState = {
    isLoading: false,
    showAlert: false,
    alertType: "",
    alertText: "",
    user,
    token,
    authFormData: initialAuthFormData,
    jobFormData: initialJobFormData,
    authClientFormData: initialAuthClientFormData,
    allJobs: [],
    allJobsCount: 0,
    clientJobs: [],
    clientJobsCount: 0,
    singleJob: null,
    clientDetails: null,
    candidateJobs: [],
    candidateJobsCount: 0,
    savedJobs: [],
    savedJobsCount: 0
};

const appContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // setting authorization headers automatically
    const authFetch = axios.create({
        baseURL: "/api/v1"
    });

    authFetch.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${state.token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    authFetch.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response.status === 401) {
            console.log(error);
            logoutUser();
        }
        return Promise.reject(error);
    });

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

    const setAuthFormData = (values) => {
        dispatch({ type: SET_AUTH_FORM_DATA, payload: { values } });
    }

    const setAuthClientFormData = (values) => {
        dispatch({ type: SET_AUTH_CLIENT_FORM_DATA, payload: { values } });
    }

    const setJobFormData = (values) => {
        dispatch({ type: SET_JOB_FORM_DATA, payload: { values } })
    }


    // to register a candidate
    const registerCandidate = async (newCandidate) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/register`, newCandidate);
            const { user, token } = data;

            addUserToLocalStorage({ user, token });
            dispatch({ type: CANDIDATE_REGISTER_SUCCESS, payload: { user, token } });
        } catch (error) {
            dispatch({
                type: API_REQUEST_ERROR,
                payload: { message: error.response.data.message }
            });
        }
        clearAlert();
    }

    // to login a candidate
    const loginCandidate = async (candidate) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/login`, candidate);
            const { user, token } = data;
            addUserToLocalStorage({ user, token });
            dispatch({ type: CANDIDATE_LOGIN_SUCCESS, payload: { user, token } });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
        clearAlert();
    }

    // to login a client
    const loginClient = async (client) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/client/login`, client);
            const { user, token } = data;
            addUserToLocalStorage({ user, token });
            dispatch({ type: CLIENT_LOGIN_SUCCESS, payload: { user, token } });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
        clearAlert();
    }

    // to register a client
    const registerClient = async (newClient) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/client/register`, newClient);
            const { user, token } = data;

            addUserToLocalStorage({ user, token });
            dispatch({ type: CLIENT_REGISTER_SUCCESS, payload: { user, token } });
        } catch (error) {
            dispatch({
                type: API_REQUEST_ERROR,
                payload: { message: error.response.data.message }
            });
        }
        clearAlert();
    }

    // logout a user
    const logoutUser = () => {
        if (state.token !== null) {
            removeUserFromLocalStorage();
            dispatch({ type: LOGOUT_USER });
            clearAlert();
        }
    }

    const clearJobForm = () => {
        setJobFormData(initialJobFormData);
    }

    // to get all jobs
    const getAllJobs = async () => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await axios.get("/api/v1/jobs");
            const { count, jobs } = data;
            dispatch({ type: GET_ALL_JOBS_SUCCESS, payload: { jobs, count } });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
    }

    // to get jobs particular to a client
    const getJobs = async () => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await authFetch.get(`/jobs/client/${state.user?._id}`);
            const { count, jobs } = data;
            dispatch({ type: GET_JOBS_SUCCESS, payload: { jobs, count } });
        } catch (error) {
            console.log(error);
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
    }


    // to add job by client
    const addJob = async (newJob) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            await authFetch.post("/jobs", newJob);
            getJobs();
            getAllJobs();
            dispatch({ type: ADD_JOB_SUCCESS });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
        clearAlert();
    }

    const editJob = async (jobId, job) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            await authFetch.patch(`/jobs/${jobId}`, job);
            dispatch({ type: EDIT_JOB_SUCCESS });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
        clearAlert();
    }

    // to delete a job
    const deleteJob = async (jobId) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            await authFetch.delete(`/jobs/${jobId}`);
            getJobs();
            getAllJobs();
            dispatch({ type: DELETE_JOB_SUCCESS });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
        clearAlert();
    }

    // get single Job
    const getSingleJob = async (jobId) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await axios.get(`/api/v1/jobs/${jobId}`);
            const { job } = data;
            dispatch({ type: GET_SINGLE_JOB_SUCCESS, payload: { job } });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
    }

    // to get client details
    const getClientDetails = async (clientId) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await axios.get(`/api/v1/clients/details/${clientId}`);
            const { user } = data;
            dispatch({ type: GET_CLIENT_DETAILS_SUCCESS, payload: { user } });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR });
        }
        clearAlert();
    }

    // to apply for a job
    const applyForJob = async (jobId) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            await authFetch.patch(`/jobs/candidate/${jobId}`);
            dispatch({ type: JOB_APPLY_SUCCESSFUL });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR });
        }
        clearAlert();
    }

    // get jobs candidate applied for
    const getCandidateJobs = async (candidateId) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await authFetch.get(`/jobs/candidate/${candidateId}`);
            const { jobs, count } = data;
            dispatch({ type: GET_CANDIDATE_JOBS_SUCCESS, payload: { jobs, count } });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
        clearAlert();
    }

    // to save a job for a candidate
    const saveJob = async (jobId) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await authFetch.patch(`/jobs/saved-job/${jobId}`);
            console.log(data);
            dispatch({ type: SAVE_JOB_SUCCESS });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }
        clearAlert();
    }

    // to get all saved jobs of a candidate
    const getSavedJobs = async (candidateId) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            const { data } = await authFetch.get(`/jobs/saved-job/${candidateId}`);
            const { jobs, count } = data;
            dispatch({ type: GET_SAVED_JOBS_SUCCESS, payload: { jobs, count } });
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR });
        }
        clearAlert();
    }

    // to get applicant details
    const getApplicant = async (applicantId) => {
        try {
            const { data } = await authFetch.get(`/clients/candidate-details/${applicantId}`);
            const { applicant } = data;
            return applicant;
        } catch (error) {
            console.log(error);
        }
    }

    // to accept a candidate
    const acceptCandidate = async (jobId, candidateId) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            await authFetch.patch(`/jobs/accept/${jobId}`, { candidateId });
            getSingleJob(jobId);
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }

    }

    // to reject a candidate
    const rejectCandidate = async (jobId, candidateId) => {
        dispatch({ type: API_REQUEST_BEGIN });
        try {
            await authFetch.patch(`/jobs/reject/${jobId}`, { candidateId });
            getSingleJob(jobId);
        } catch (error) {
            dispatch({ type: API_REQUEST_ERROR, payload: { message: error.response.data.message } });
        }

    }


    return <appContext.Provider value={{
        ...state,
        setAuthFormData,
        displayAlert,
        registerCandidate,
        loginCandidate,
        logoutUser,
        loginClient,
        registerClient,
        setJobFormData,
        addJob,
        clearJobForm,
        getAllJobs,
        getJobs,
        logoutUser,
        setAuthClientFormData,
        getSingleJob,
        getClientDetails,
        deleteJob,
        editJob,
        applyForJob,
        getCandidateJobs,
        saveJob,
        getSavedJobs,
        getApplicant,
        acceptCandidate,
        rejectCandidate
    }}>
        {children}
    </appContext.Provider>
}

const useAppContext = () => {
    return useContext(appContext);
}

export { initialState, AppProvider, useAppContext, initialAuthFormData, initialAuthClientFormData, initialJobFormData }; 