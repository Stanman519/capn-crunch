export default function ownerReducer(state = [], action){
    if (action.type === 'LOAD_OWNERS'){
        return action.ownerList; 
    }
    else {
        return state

    }
}