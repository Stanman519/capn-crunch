import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadOwners } from '../redux/actions/ownerActions.js';
import { selectTeam } from '../redux/actions/teamActions.js';
import { loadTransactions } from '../redux/actions/transactionActions.js';
import '../styles/DeadCapTable.scss';


export default function DeadCapTable() {
    const selectedTeam = useSelector(state => state.selectedTeam?.selectedTeam);
    const ownerList = useSelector(state => state.ownerList);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const handleClick = (row) => {
        dispatch(selectTeam(row));
    }
    console.log("owners", ownerList)
    //move to app level
    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://mfl-capn.herokuapp.com/Mfl/deadCapInfo`)
                .then(res => {
                    dispatch(loadOwners(res.data))
                    setTimeout(dispatch(selectTeam(res.data[0])), 6000)
            })
            axios.get(`https://mfl-capn.herokuapp.com/Mfl/transactions/2020`)
                .then(res => {
                    dispatch(loadTransactions(res.data))
                    setIsLoading(false)
            })
        }
        fetchData() 
      }, []);
        if (!isLoading) {
            return (
                <TableContainer class="scroll" >
                    <Table size="small" class="table">
                        <TableHead>
                            <TableRow class="table-text" style={{ paddingBottom: 200 }}>
                                <TableCell class="table-text">Team</TableCell>
                                <TableCell class="table-text">2020</TableCell>
                                <TableCell class="table-text">2021</TableCell>
                                <TableCell class="table-text">2022</TableCell>
                                <TableCell class="table-text">2023</TableCell>
                                <TableCell class="table-text">2024</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody class="">
                            { ownerList.map((row) => (
                                <TableRow onClick={() => handleClick(row)}
                                    style={{ backgroundColor: selectedTeam?.team === row?.team ? '#420E97' : '#283142' }}
                                    key={ownerList.franchiseId}>
                                    <TableCell class="table-text first">{row.team}</TableCell>
                                    <TableCell class="table-text">${row.amount[0] ?? 0}</TableCell>
                                    <TableCell class="table-text">${row.amount[1] ?? 0}</TableCell>
                                    <TableCell class="table-text">${row.amount[2] ?? 0}</TableCell>
                                    <TableCell class="table-text">${row.amount[3] ?? 0}</TableCell>
                                    <TableCell class="table-text last">${row.amount[4] ?? 0}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
        else { 
            return (
                <div>
                    <h1 class="title"> Dead Cap Tracker </h1>
                    <div>
                        <CircularProgress/> 
                    </div>
                </div>
            );
    }
}

DeadCapTable.propTypes = {
    // ownerList: PropTypes.array.isRequired,
    // loadOwners: PropTypes.func.isRequired,
    // selectedTeam: PropTypes.object.isRequired,
    // selectTeam: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    return {
        //re-render when THESE change
        ownerList: state.ownerList,
        selectedTeam: state.selectedTeam
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loadOwners: owner => dispatch(loadOwners(owner)),
        selectTeam: team => dispatch(selectTeam(team))
        //actions: bindActionCreators(actions, dispatch)
    };
    //what actions do you want to expose as props (determines which actions instead of which state)
}

//export default connect(mapStateToProps, mapDispatchToProps)(DeadCapTable);
