export function selectTeam(selectedTeam){
    console.log("action", selectedTeam);
    return { type: "SELECT_TEAM", selectedTeam };
}