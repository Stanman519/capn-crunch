import axios from 'axios';
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { field: 'name', headerName: 'Name'},
    { field: 'team', headerName: 'Team'},
    { field: 'position', headerName: 'Positon' },
    { field: 'age', headerName: 'Age'},
    { field: 'salary', headerName: 'Current Salary'},
]


class ImpendingFreeAgents extends React.Component {

    state = {
        players: [],

    }


    componentDidMount() {
        axios.get(`https://mfl-capn.herokuapp.com/Mfl/impendingFreeAgents/2020`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:3000'
            }
        })
            .then(res => {
                this.setState({ players: res.data });
            })
    }


    render() {
        return (
            <TableContainer>
                <Table size="small" columns={columns}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.players.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.team}</TableCell>
                                <TableCell>{row.position}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>${parseInt(row.salary) ?? row.salary}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default ImpendingFreeAgents;
