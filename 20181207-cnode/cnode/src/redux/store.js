import {createStore,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import indexlist from "./indexReducer";
import detail from "./detailReducer";
let reducer = combineReducers({
    indexlist,
    detail
})
let store = createStore(reducer,applyMiddleware(thunk));

export default store;