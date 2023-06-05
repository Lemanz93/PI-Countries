import rootReducer from '../reducers/reducer'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { legacy_createStore as createStore } from 'redux'

const middlewareEnhancer = applyMiddleware(thunkMiddleware)
export default function configureStore(){
    const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer))
    return store
}