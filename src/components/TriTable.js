import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../styles/TriTable.scss';

class TriTable extends React.Component {
    state = {
        standings: []
    } 


    componentDidMount() {
        axios.get(`https://mfl-capn.herokuapp.com/Mfl/standings/2020`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:3000'
            }
        })
            .then(res => {
                let sorted = res.data.sort((a, b) => ((a.h2hWins1 * 5 + a.pointsFor1) + (a.h2hWins2 * 5 + a.pointsFor2) + (a.h2hWins3 * 5 + a.pointsFor3)) > ((b.h2hWins1 * 5 + b.pointsFor1) + (b.h2hWins2 * 5 + b.pointsFor2) + (b.h2hWins3 * 5 + b.pointsFor3)) ? -1 : 1 );
                this.setState({ standings: sorted })
                console.log(this.state.sorted);
            });
    }

    render() {
        return (
            <div>
            <h1 class="title"> Tri-Year Trophy Standings </h1>
            <TableContainer class="tri-scroll">
                <Table >

                    <TableHead>
                        <TableRow>
                            <TableCell class="year-text"></TableCell>
                            <TableCell class="year-text"></TableCell>
                            <TableCell class="year-text">2020</TableCell>
                            <TableCell class="year-text"></TableCell>
                            <TableCell class="year-text"></TableCell>
                            <TableCell class="year-text">2021</TableCell>
                            <TableCell class="year-text"></TableCell>
                            <TableCell class="year-text"></TableCell>
                            <TableCell class="year-text">2022</TableCell>
                            <TableCell class="year-text"></TableCell>
                            <TableCell class="year-text"></TableCell>
                        </TableRow>
                        <TableRow class="horizontal">
                            <TableCell></TableCell>
                            <TableCell class="tritable-text">Wins</TableCell>
                            <TableCell class="tritable-text">Pts For</TableCell>
                            <TableCell class="tritable-text">TYT Pts</TableCell>
                            <TableCell class="tritable-text">Wins</TableCell>
                            <TableCell class="tritable-text">Pts For</TableCell>
                            <TableCell class="tritable-text">TYT Pts</TableCell>
                            <TableCell class="tritable-text">Wins</TableCell>
                            <TableCell class="tritable-text">Pts For</TableCell>
                            <TableCell class="tritable-text">TYT Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.standings.map((row) => (
                            <TableRow class="horizontal" key={row.franchiseId}>
                                <TableCell class="team-text">
                                    {this.props.ownerList.find(o => o.franchiseId === row.franchiseId).team} 
                                    <p class="total">{(row.h2hWins1 * 5 + row.pointsFor1) + (row.h2hWins2 * 5 + row.pointsFor2) + (row.h2hWins3 * 5 + row.pointsFor3)} total points</p>
                                
                                </TableCell>
                                <TableCell class="tritable-text">{row.h2hWins1 ?? 0}</TableCell>
                                <TableCell class="tritable-text">{row.pointsFor1 ?? 0}</TableCell>
                                <TableCell class="vertical tritable-text">{row.h2hWins1 * 5 + row.pointsFor1}</TableCell>
                                <TableCell class="tritable-text">{row.h2hWins2 ?? 0}</TableCell>
                                <TableCell class="tritable-text">{row.pointsFor2 ?? 0}</TableCell>
                                <TableCell class="vertical tritable-text">{row.h2hWins2 * 5 + row.pointsFor2}</TableCell>
                                <TableCell class="tritable-text">{row.h2hWins3 ?? 0}</TableCell>
                                <TableCell class="tritable-text">{row.pointsFor3 ?? 0}</TableCell>
                                <TableCell class="tritable-text">{row.h2hWins3 * 5 + row.pointsFor3}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        )
    }
}

export default connect(function mapStateToProps(state, props){
    return {
        ownerList: state.ownerList
    }
})(TriTable);