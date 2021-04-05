import { loadTransactions } from '../redux/actions/transactionActions.js';
import axios from 'axios';



export const fetchTransactions = () => async dispatch => {
        return axios.get(`https://mfl-capn.herokuapp.com/Mfl/transactions/2020`)
        .then((res) => {
            console.log("data", res.data);
            dispatch(loadTransactions(res.data))
        })
    }

