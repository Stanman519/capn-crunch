import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../styles/TriTable.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function TriTable() {
    const ownerList = useSelector(state => state.ownerList);
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://mfl-capn.herokuapp.com/Mfl/standings/2020`)
            .then(res => {
                let sorted = res.data.sort((a, b) => ((a.h2hWins1 * 5 + a.pointsFor1) + (a.h2hWins2 * 5 + a.pointsFor2) + (a.h2hWins3 * 5 + a.pointsFor3)) > ((b.h2hWins1 * 5 + b.pointsFor1) + (b.h2hWins2 * 5 + b.pointsFor2) + (b.h2hWins3 * 5 + b.pointsFor3)) ? -1 : 1);
                setStandings(sorted)
                setIsLoading(false)
            });
    }, []);
    if (!isLoading){
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
                            {standings.map((row) => (
                                <TableRow class="horizontal" key={row.franchiseId}>
                                    <TableCell class="team-text">
                                        {ownerList.find(o => o.franchiseId === row.franchiseId).team}
                                        <p class="total">{(row.h2hWins1 * 5 + row.pointsFor1) + (row.h2hWins2 * 5 + row.pointsFor2)
                                            + (row.h2hWins3 * 5 + row.pointsFor3)} total points</p>

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
        );
    } else {
        return (
            <div>
                <circularProgress/>
            </div>
            );
    }
}
TriTable.propTypes = {
    // ownerList: PropTypes.array.isRequired,
    // loadOwners: PropTypes.func.isRequired,
    // selectedTeam: PropTypes.object.isRequired,
    // selectTeam: PropTypes.func.isRequired
}

// export default connect(function mapStateToProps(state, props) {
//     return {
//         ownerList: state.ownerList
//     }
// })(TriTable);
