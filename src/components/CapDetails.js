import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../styles/CapDetails.css';

class CapDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            playersOnSelectedTeam20: [],
            playersOnSelectedTeam21: [],
            playersOnSelectedTeam22: [],
            playersOnSelectedTeam23: [],
            playersOnSelectedTeam24: []
        }
    }
    componentDidMount() {
        axios.get(`https://mfl-capn.herokuapp.com/Mfl/transactions/2020`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:3000'
            }
        })
            .then(res => {
                this.props.dispatch({type:"LOAD_TRANSACTIONS", data: res.data})
            })
    }  
    componentDidUpdate(){
        this.state.playersOnSelectedTeam20 = this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2020);
        this.state.playersOnSelectedTeam21 = this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2021);
        this.state.playersOnSelectedTeam22 = this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2022);
        this.state.playersOnSelectedTeam23 = this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2023);
        this.state.playersOnSelectedTeam24 = this.props.transactions.filter( 
            t => t.franchiseId == this.props.selectedTeam.franchiseId && 
            (t.yearOfTransaction + t.years) > 2024)
    }
    

    render() {
        return (
            <div class="component">
            <p class="details-title"> { this.props.selectedTeam.team }'s Penalties </p>
            <TableContainer class="details-table">
                <Table>
                {this.props.playersOnSelectedTeam20 &&
                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2020</TableCell>
                        </TableRow>
                    </TableHead>
                }
                    <TableBody>
                        {this.state.playersOnSelectedTeam20.map((row) => (
                            <TableRow key={this.props.transactions.transactionId}>
                                <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                <TableCell class="player-penalty-text">${row.amount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                    {this.props.playersOnSelectedTeam21 &&
                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2021</TableCell>
                        </TableRow>
                    </TableHead>
                    }
                    <TableBody>
                        {this.state.playersOnSelectedTeam21.map((row) => (
                            <TableRow key={this.props.transactions.transactionId}>
                                <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                <TableCell class="player-penalty-text">${row.amount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                    {this.props.playersOnSelectedTeam22 &&
                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2022</TableCell>
                        </TableRow>
                    </TableHead>
                    }
                    <TableBody>
                        {this.state.playersOnSelectedTeam22.map((row) => (
                            <TableRow key={this.props.transactions.transactionId}>
                                <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                <TableCell class="player-penalty-text">${row.amount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                    {this.props.playersOnSelectedTeam23 &&
                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2023</TableCell>
                        </TableRow>
                    </TableHead>
                    }
                    <TableBody>
                        {this.state.playersOnSelectedTeam23.map((row) => (
                            <TableRow key={this.props.transactions.transactionId}>
                                <TableCell class="player-penalty-text">{row.playerName}</TableCell>
                                <TableCell class="player-penalty-text">${row.amount}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                    {this.props.playersOnSelectedTeam23 &&
                    <TableHead>
                        <TableRow class="horizontal-year">
                            <TableCell></TableCell>
                            <TableCell class="year">2024</TableCell>
                        </TableRow>
                    </TableHead>
    }
                    <TableBody>
                        {this.state.playersOnSelectedTeam24.map((row) => (
                            <TableRow key={this.props.transactions.transactionId}>
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



export default connect(function mapStateToProps(state, props){
    return {
        transactions: state.transactions,
        selectedTeam: state.selectedTeam
    }
})(CapDetails);
