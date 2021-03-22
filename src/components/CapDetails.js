import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { loadTransactions } from '../redux/actions/transactionActions.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/CapDetails.css';



export default function CapDetails() {
    const selectedTeam = useSelector(state => state.selectedTeam.selectedTeam);
    const transactions = useSelector(state => state.transactions.filter(t => t.franchiseId === state.selectedTeam?.selectedTeam?.franchiseId));
    const [playersOnSelectedTeam20, setplayersOnSelectedTeam20] = useState([]);
    const [playersOnSelectedTeam21, setplayersOnSelectedTeam21] = useState([]);
    const [playersOnSelectedTeam22, setplayersOnSelectedTeam22] = useState([]);
    const [playersOnSelectedTeam23, setplayersOnSelectedTeam23] = useState([]);
    const [playersOnSelectedTeam24, setplayersOnSelectedTeam24] = useState([]);
    //const [isLoading, setIsLoading] = useState(selectedTeam === undefined ? true : false);d
    //const dispatch = useDispatch();

    //const [localTeam, setLocalTeam] = useState(2)

    useEffect(() => {
        if (selectedTeam == null) { return; }
            setplayersOnSelectedTeam20(transactions.filter(t =>
                t.franchiseId === selectedTeam.franchiseId && (t.yearOfTransaction + t.years) > 2020));
            setplayersOnSelectedTeam21(transactions.filter(t =>
                t.franchiseId === selectedTeam.franchiseId && (t.yearOfTransaction + t.years) > 2021));
            setplayersOnSelectedTeam22(transactions.filter(t =>
                t.franchiseId === selectedTeam.franchiseId && (t.yearOfTransaction + t.years) > 2022));
            setplayersOnSelectedTeam23(transactions.filter(t =>
                t.franchiseId === selectedTeam.franchiseId && (t.yearOfTransaction + t.years) > 2023));
            setplayersOnSelectedTeam24(transactions.filter(t =>
                t.franchiseId === selectedTeam.franchiseId && (t.yearOfTransaction + t.years) > 2024));

    }, [selectedTeam]);




    if (!!selectedTeam) {
        return (
            <div class="component">
                <p class="details-title"> {selectedTeam?.team}'s Penalties </p>
                <TableContainer class="details-table">
                    <Table>
                        {playersOnSelectedTeam20.length > 0 && 
                            <TableHead>
                                <TableRow class="horizontal-year">
                                    <TableCell></TableCell>
                                    <TableCell class="year">2020</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                            <TableBody>
                                {playersOnSelectedTeam20.map((row) => (
                                    <TableRow key={playersOnSelectedTeam20.transactionId}>
                                        <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                        <TableCell class="player-penalty-text">${row.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        {playersOnSelectedTeam21.length > 0 && 
                            <TableHead>
                                <TableRow class="horizontal-year">
                                    <TableCell></TableCell>
                                    <TableCell class="year">2021</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                            <TableBody>
                                {playersOnSelectedTeam21.map((row) => (
                                    <TableRow key={playersOnSelectedTeam21.transactionId}>
                                        <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                        <TableCell class="player-penalty-text">${row.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        {playersOnSelectedTeam22.length > 0 && 
                            <TableHead>
                                <TableRow class="horizontal-year">
                                    <TableCell></TableCell>
                                    <TableCell class="year">2022</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                            <TableBody>
                                {playersOnSelectedTeam22.map((row) => (
                                    <TableRow key={playersOnSelectedTeam22.transactionId}>
                                        <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                        <TableCell class="player-penalty-text">${row.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        {playersOnSelectedTeam23.length > 0 && 
                            <TableHead>
                                <TableRow class="horizontal-year">
                                    <TableCell></TableCell>
                                    <TableCell class="year">2023</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                        <TableBody>
                            {playersOnSelectedTeam23.map((row) => (
                                <TableRow key={playersOnSelectedTeam23.transactionId}>
                                    <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                    <TableCell class="player-penalty-text">${row.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {playersOnSelectedTeam24.length > 0 && 
                            <TableHead>
                                <TableRow class="horizontal-year">
                                    <TableCell></TableCell>
                                    <TableCell class="year">2024</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                        <TableBody>
                            {playersOnSelectedTeam24.map((row) => (
                                <TableRow key={playersOnSelectedTeam24.transactionId}>
                                    <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                    <TableCell class="player-penalty-text">${row.amount}</TableCell>
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
                <h1 class="title"> Penalties </h1>
                <div>
                    <CircularProgress/> 
                </div>
            </div>
        );
    }
}


CapDetails.propTypes = {
    // transactions: PropTypes.array.isRequired,
    // loadTransactions: PropTypes.func.isRequired,
    // selectedTeam: PropTypes.object.isRequired,
    // selectTeam: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    return {
        //re-render when THESE change
        transactions: state.transactions,
        selectedTeam: state.selectedTeam
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loadTransactions: transaction => dispatch(loadTransactions(transaction)),
        //actions: bindActionCreators(actions, dispatch)
    };
}
//export default connect(mapStateToProps, mapDispatchToProps)(CapDetails);
