import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as ownerActions from '../redux/actions/ownerActions.js';
import * as teamActions from '../redux/actions/teamActions.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/DeadCapTable.scss';
import PropTypes from 'prop-types';


class DeadCapTable extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                ownerList: [],
                selectedTeam: {},
                isLoading: true,
                content: ''
            }
    }

    componentDidMount(){
        axios.get(`https://mfl-capn.herokuapp.com/Mfl/deadCapInfo`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                this.props.loadOwners(res.data)
            })
            .then(() => {
                setTimeout(this.props.selectTeam(this.props.ownerList[0]), 1000);
            })
            .then(content => this.setState({ content: content, isLoading : false }))
    };
    pickTeam = franchise => {
        this.props.selectTeam(franchise)
        setTimeout(() => {console.log("manually selected team is ", this.props.selectedTeam)}, 2000);
    };

    render(){
        let content = <CircularProgress />;
        if (!this.state.isLoading) {
            content = (
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
                            {this.props.ownerList.map((row) => (
                                <TableRow onClick={() => this.pickTeam(row)}
                                    style={{ backgroundColor: this.props.selectedTeam.team === row.team ? '#420E97' : '#283142' }}
                                    key={this.props.ownerList.franchiseId}>
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

        return (
            <div>
                <h1 class="title"> Dead Cap Tracker </h1>
                <div>
                    {content}
                </div>
            </div>
        );
    }
}

DeadCapTable.propTypes = {
    ownerList: PropTypes.array.isRequired,
    loadOwners: PropTypes.func.isRequired,
    selectedTeam: PropTypes.object.isRequired,
    selectTeam: PropTypes.func.isRequired
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
        loadOwners: owner => dispatch(ownerActions.loadOwners(owner)),
        selectTeam: team => dispatch(teamActions.selectTeam(team))
        //actions: bindActionCreators(actions, dispatch)
    };
    //what actions do you want to expose as props (determines which actions instead of which state)
}

export default connect(mapStateToProps, mapDispatchToProps)(DeadCapTable);
