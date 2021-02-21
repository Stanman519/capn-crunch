export function selectTeam(selectedTeam){
    console.log("selectedTeam in action:", selectedTeam)
    return { type: "SELECT_TEAM", selectedTeam };
}