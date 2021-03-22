import { createStore } from 'redux';
import rootReducer from './reducers/index.js';


export default function configureStore(initialState){
    //const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, 
        initialState, 
        //omposeEnhancers()//applyMiddleware(reduxImmutableStateInvariant()))
    );
}

