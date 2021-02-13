import { createStore } from 'redux';



function updateStore(state = { ownerList: [], transactions: [], selectedTeam: {}}, action){
    if (action.type === 'LOAD_OWNERS'){
        return {
            ...state,
            ownerList: action.data
        }
    }
    if (action.type === 'LOAD_TRANSACTIONS'){
        return {
            ...state,
            transactions: action.data
        }
    }
    if (action.type === 'SELECT_TEAM'){
        return {
            ...state,
            selectedTeam: action.data
        }
    }
    return state
}




var store = createStore(updateStore);

export default store;