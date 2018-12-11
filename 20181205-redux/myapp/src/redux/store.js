import {createStore} from "redux";
import reducers from "./reducer";
let store = createStore(reducers);
store.subscribe(function () {
    let data = JSON.stringify(store.getState().todo);
    localStorage.setItem("todo",data);
});
export default store;