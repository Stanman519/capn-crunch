import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as transactionActions from '../redux/actions/transactionActions.js';
import '../styles/CapDetails.css';
import PropTypes from 'prop-types'

class CapDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTeam: {},
            playersOnSelectedTeam20: [],
            playersOnSelectedTeam21: [],
            playersOnSelectedTeam22: [],
            playersOnSelectedTeam23: [],
            playersOnSelectedTeam24: [],
            transactions: []
        }
    }
    componentDidMount() {
        axios.get(`https://mfl-capn.herokuapp.com/Mfl/transactions/2020`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                this.props.loadTransactions(res.data)
            })
    }  
    componentDidUpdate(prevProps){
        if(this.props.selectedTeam.team !== prevProps.selectedTeam.team){
            this.setState({playersOnSelectedTeam20: this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2020)});
        this.setState({playersOnSelectedTeam21: this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2021)});
        this.setState({playersOnSelectedTeam22: this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2022)});
        this.setState({playersOnSelectedTeam23: this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2023)});
        this.setState({playersOnSelectedTeam24: this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2024)});
        }
    }
    

    render() {
        return (
            <div class="component">
            <p class="details-title"> { this.props.selectedTeam?.team }'s Penalties </p>
            <TableContainer class="details-table">
                <Table>
                  {/* {this.state.playersOnSelectedTeam20.size > 0 && */}
                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2020</TableCell>
                        </TableRow>
                    </TableHead>
                  {/* }  */}
                    <TableBody>
                        {this.state.playersOnSelectedTeam20.map((row) => (
                            <TableRow key={this.state.playersOnSelectedTeam20.transactionId}>
                                <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                <TableCell class="player-penalty-text">${row.amount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>

                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2021</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {this.state.playersOnSelectedTeam21.map((row) => (
                            <TableRow key={this.state.playersOnSelectedTeam21.transactionId}>
                                <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                <TableCell class="player-penalty-text">${row.amount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>

                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2022</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.playersOnSelectedTeam22.map((row) => (
                            <TableRow key={this.state.playersOnSelectedTeam22.transactionId}>
                                <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                <TableCell class="player-penalty-text">${row.amount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>

                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2023</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.playersOnSelectedTeam23.map((row) => (
                            <TableRow key={this.state.playersOnSelectedTeam23.transactionId}>
                                <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                <TableCell class="player-penalty-text">${row.amount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>

                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2024</TableCell>
                        </TableRow>
                    </TableHead>
    
                    <TableBody>
                        {this.state.playersOnSelectedTeam24.map((row) => (
                            <TableRow key={this.state.playersOnSelectedTeam24.transactionId}>
                                <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                <TableCell class="player-penalty-text">${row.amount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                </Table>
            </TableContainer>
            </div>

        );
    }
 }
 CapDetails.propTypes = {
    transactions: PropTypes.array.isRequired,
    loadTransactions: PropTypes.func.isRequired,
    selectedTeam: PropTypes.object.isRequired,
    selectTeam: PropTypes.func.isRequired
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
        loadTransactions: transaction => dispatch(transactionActions.loadTransactions(transaction)),
        //actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CapDetails);
