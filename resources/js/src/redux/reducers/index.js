import { combineReducers } from "redux";
import { statusReducer } from "./statusReducer";

const allReducers = combineReducers({
    appStatus: statusReducer,
})

export default allReducers; 