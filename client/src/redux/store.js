import { legacy_createStore as createStore} from 'redux'
import { compose, applyMiddleware } from "redux";
import rootReducer from './reducer'

//para cosas asíncronas y nos permite hacer las request
import thunkMiddleware from 'redux-thunk'

//la extensión tiene la capacidad de hacer un compose, sino va al compose normal
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore ( 
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);



export default store;