import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import stickyHeader from'@material-ui/data-grid';
import '../styles/DeadCapTable.scss';
import { makeStyles } from "@material-ui/core/styles";
//import Table from 'react-bootstrap/Table';

class DeadCapTable extends React.Component {
    componentDidMount() {
        axios.get(`https://mfl-capn.herokuapp.com/Mfl/deadCapInfo`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:3000'
            }
        })
            .then(res => {
                this.props.dispatch({type:"LOAD_OWNERS", data: res.data})
            })
            .then( () => {
                this.props.dispatch({type:"SELECT_TEAM", data: this.props.ownerList[0]})
            })
    };
    selectTeam(franchise){
        this.props.dispatch({type:"SELECT_TEAM", data: franchise})
        console.log(this.props.selectedTeam)
    };

    render() {
        return (
            <div>
            <h1 class="title"> Dead Cap Tracker </h1>
            <TableContainer class="scroll" >
                <Table stickyHeader size="small" class="table">
                    <TableHead>
                        <TableRow class="table-text" style={{paddingBottom: 200}}>
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
                            <TableRow onClick={() => this.selectTeam(row)} 
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
            </div>
        );
    }
 }


export default connect(function mapStateToProps(state, props){
    return {
        ownerList: state.ownerList,
        selectedTeam: state.selectedTeam
    }
})(DeadCapTable);
