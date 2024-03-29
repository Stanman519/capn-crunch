import axios from 'axios';
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'name', headerName: 'Name', width: 300},
    { field: 'team', headerName: 'Team'},
    { field: 'position', headerName: 'Positon' },
    { field: 'age', headerName: 'Age'},
    { field: 'salary', headerName: 'Current Salary', width: 200},
]


class ImpendingFreeAgents extends React.Component {

    state = {
        players: []
    }


    componentDidMount() {
        axios.get(`https://mfl-capn.herokuapp.com/Mfl/impendingFreeAgents/2021`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                this.setState({ players: res.data })
            })
    }

    render() {
        return (
            <div style={{ height: "100vh"}}>
                {/* width: 800, display: "flex", justifyContent: "center" */}
                <DataGrid size="small" columns={columns} rows={this.state.players}>
                </DataGrid>
            </div>
        );
    }
}

export default ImpendingFreeAgents;
