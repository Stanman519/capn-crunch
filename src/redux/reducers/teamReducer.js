export default function teamReducer(state = [], action){
    if (action.type === 'SELECT_TEAM'){
        return {...state, selectedTeam: action.selectedTeam};
    }
    else {
        return state
    }
}