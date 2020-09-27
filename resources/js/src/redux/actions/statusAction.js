import {
    APP_STATUS_SUCCESS,
    APP_STATUS_FAILED,
    APP_STATUS_FETCHING,
    APP_STATUS_LOADING,
    APP_STATUS_RESET,
} from "../constants/statusConstant";

/* 
    Will reset the app status.
*/
export function appStatusReset() {
    return {
        type: APP_STATUS_RESET,
    }
}


/* 
    Dispatch on successful task.
*/
export function appStatusSuccess(message) {
    return {
        type: APP_STATUS_SUCCESS,
        payload: {
            success: true,
            message
        }
    }
}

/* 
    Dispatch on failed task
*/
export function appStatusFailed(message) {
    return {
        type: APP_STATUS_FAILED,
        payload: {
            failure: true,
            message
        }
    }
}

/* 
    Dispatch on loading some data/component
*/
export function appStatusLoading(message) {
    return {
        type: APP_STATUS_LOADING,
        payload: {
            loading: true,
            message
        }
    }
}

/* 
    Dispatch on fetching some data
*/
export function appStatusFetching(message) {
    return {
        type: APP_STATUS_FETCHING,
        payload: {
            fetching: true,
            message
        }
    }
}
