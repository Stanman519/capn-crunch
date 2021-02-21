export default function transactionReducer(state = [], action){
    if (action.type === 'LOAD_TRANSACTIONS'){
        return action.transactions;
    }
    return state
}