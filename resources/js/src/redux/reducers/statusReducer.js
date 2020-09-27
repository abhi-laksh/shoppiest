import {
    APP_STATUS_SUCCESS,
     APP_STATUS_FAILED, 
     APP_STATUS_FETCHING,
     APP_STATUS_LOADING,
     APP_STATUS_RESET,
} from "../constants/statusConstant";

/* 
    @object: {
    success: if the request or an operation is successful,
    failure: if the request or an operation is failed or an error occured,
    loading: if the data or component in loading,
    fetching: if the request is succefull and data is fetching,
    message: To display any message,
}
*/

const initialState = {
    success: false,
    failure: false,
    loading: false,
    fetching: false,
    message: null,
}

export function statusReducer(state = initialState, action) {
    switch (action.type) {
        case APP_STATUS_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                failure: false,
                loading: false,
                fetching: false,
            };
        case APP_STATUS_FAILED:
            return {
                ...state,
                failure: action.payload.failure,
                message: action.payload.message,
                success: false,
                loading: false,
                fetching: false,
            };
        case APP_STATUS_FETCHING:
            return {
                ...state,
                fetching: action.payload.fetching,
                message: action.payload.message,
                failure: false,
                success: false,
                loading: false,
            };
        case APP_STATUS_LOADING:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
                success: false,
                failure: false,
                fetching: false,
            };
        case APP_STATUS_RESET:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}