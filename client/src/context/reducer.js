import { initialState, initialAuthFormData, initialAuthClientFormData, initialJobFormData } from "./appContext";

import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    API_REQUEST_BEGIN,
    API_REQUEST_ERROR,
    CLIENT_LOGIN_SUCCESS,
    CLIENT_REGISTER_SUCCESS,
    CANDIDATE_LOGIN_SUCCESS,
    CANDIDATE_REGISTER_SUCCESS,
    LOGOUT_USER,
    SET_AUTH_FORM_DATA,
    SET_JOB_FORM_DATA,
    ADD_JOB_SUCCESS,
    GET_JOBS_SUCCESS,
    GET_ALL_JOBS_SUCCESS,
    SET_AUTH_CLIENT_FORM_DATA,
    GET_SINGLE_JOB_SUCCESS,
    GET_CLIENT_DETAILS_SUCCESS,
    DELETE_JOB_SUCCESS,
    EDIT_JOB_SUCCESS,
    JOB_APPLY_SUCCESSFUL,
    GET_CANDIDATE_JOBS_SUCCESS,
    SAVE_JOB_SUCCESS,
    GET_SAVED_JOBS_SUCCESS,
    APPLICANT_DETAILS_SUCCESS,
    CANDIDATE_EDIT_PROFILE_SUCCESS,
    SET_CANDIDATE_PROFILE_FORM_DATA
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

    if (action.type === SET_AUTH_CLIENT_FORM_DATA) {
        return {
            ...state,
            authClientFormData: action.payload.values
        }
    }

    if (action.type === SET_JOB_FORM_DATA) {
        return {
            ...state,
            jobFormData: action.payload.values,
        }
    }

    if (action.type === SET_CANDIDATE_PROFILE_FORM_DATA) {
        return {
            ...state,
            candidateProfileData: action.payload.values,
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
            authClientFormData: initialAuthClientFormData
        }
    }

    if (action.type === CLIENT_LOGIN_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Login Successful, Redirecting...",
            user: action.payload.user,
            token: action.payload.token,
            authClientFormData: initialAuthClientFormData
        }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            isLoading: false,
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
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Job has been created.",
            jobFormData: initialJobFormData
        }
    }

    if (action.type === EDIT_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            isEditJob: false,
            alertText: "Job has been edited",
            jobFormData: initialJobFormData
        }
    }

    if (action.type === DELETE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Job has been deleted"
        }
    }

    if (action.type === GET_JOBS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            clientJobs: action.payload.jobs,
            clientJobsCount: action.payload.count,
            totalApplicantsCount: action.payload.applicantsCount,
            totalAcceptedApplicantsCount: action.payload.acceptedApplicantsCount
        }
    }

    if (action.type === GET_ALL_JOBS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: false,
            allJobs: action.payload.jobs,
            allJobsCount: action.payload.count
        }
    }

    if (action.type === GET_SINGLE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            singleJob: action.payload.job
        }
    }

    if (action.type === GET_CLIENT_DETAILS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            clientDetails: action.payload.user
        }
    }

    if (action.type === JOB_APPLY_SUCCESSFUL) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "You have successfully applied for this job!"
        }
    }

    if (action.type === GET_CANDIDATE_JOBS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            candidateJobs: action.payload.jobs,
            candidateJobsCount: action.payload.count
        }
    }

    if (action.type === SAVE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Job has been saved",
        }
    }

    if (action.type === GET_SAVED_JOBS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            savedJobs: action.payload.jobs,
            savedJobsCount: action.payload.count
        }
    }

    if (action.type === APPLICANT_DETAILS_SUCCESS) {
        return {
            ...state,
            isLoading: false
        }
    }

    if (action.type === CANDIDATE_EDIT_PROFILE_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Profile has been updated successfully",
        }
    }
}

export default reducer;