import { createStore, combineReducers, applyMiddleware } from "redux";
import modelReducer from './modelReducer';
import stateReducer from './stateReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

export default createStore(
    combineReducers({
        modelData: modelReducer,
        stateData: stateReducer,
    }),
    composeWithDevTools(applyMiddleware(...middleware))
);

export { getDatas, insertData, updateData, deleteData, deleteRedux } from './modelActionCreator';
export { setSelectedData, setIsCreating } from './stateActions';