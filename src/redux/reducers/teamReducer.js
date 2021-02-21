export default function teamReducer(state = [], action){
    if (action.type === 'SELECT_TEAM'){
        return action.selectedTeam;
    }
    return state
}