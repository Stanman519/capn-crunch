import { combineReducers } from "redux";
import ownerReducer from "./ownerReducer.js";
import transactionReducer from "./transactionReducer.js";
import teamReducer from "./teamReducer.js";

const rootReducer = combineReducers({
    ownerList: ownerReducer,
    transactions: transactionReducer,
    selectedTeam: teamReducer
});

export default rootReducer;